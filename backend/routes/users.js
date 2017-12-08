let jwt = require('express-jwt')

// Export Class routes
module.exports = function(router, config) {

    // Require user model
    const User = config.sequelize["modelManager"].getModel('user');
    
    let passport = require('passport');
    let auth = jwt({secret: process.env.SECRET, userProperty: 'payload'})
    
    // GET routes

    // GET user
    router.get('/users', auth, function(req, res, err) {
        User.findAll()
        .then(user => res.json(user))
        .catch(err => next(err))
    })

    // Get user with id
    router.get('/user/:id', auth, function(req, res, next) {
        User.findById(req.params.id)
        .then(user => {
            if(!user){
                throw new Error("User not found for id " + req.params.id)
            }
            res.json(user)
        })
        .catch(err => next(err))
    })

    //POST routes

    // Login user
    router.post('/login', function(req, res, next) {
        if(!req.body.email || !req.body.password) {
            return res.status(400).json({message: 'please fill out all fields.'})
        }
        passport.authenticate('local', function(err, user, info){
            if(err) { return next(err) }
            if(user) {
                return res.json({token: user.jwt()})
            } else {
                return res.status(401).json(info)
            }
        })(req, res, next)
    })

    // Register user
    router.post('/register', function(req, res, next) {
        if(!req.body.email || !req.body.hash){
            return res.status(400).json({message: 'Please fill out all fields'})
        }
        User.create(req.body)
        .then(user => res.json({token: user.jwt}))
        .catch(err => next(err))
    })

    router.post('/checkusername', function(req, res, next) {
        User.findAll({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if(!user){
                res.json({'email' : 'ok'})
            } else {
                res.json({'email' : 'allreadyexcists'})
            }
        })
      });

    //PUT routes
    
    //Update user
    router.put('/user/:id', auth, function(req, res, next) {
        User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(user => User.findById(req.params.id))
        .then(user => res.json(user))
        .catch(err => next(err))
    })

    // DELETE routes

    //Delete user
    router.delete('/user/:id', auth, function(req, res, next) {
        User.findById(req.params.id)
        .then(user => {
            if(!user){
                throw new Error("User not found for id " + req.params.id)
            }
            User.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.json(user)
        })
        .catch(err => next(err))
    })
}