let jwt = require('express-jwt')

// Export Class routes
module.exports = function(router, config) {
    
    // Require news model
    const News = config.sequelize["modelManager"].getModel('news');

    // Require user model
    const User = config.sequelize["modelManager"].getModel('user');

    let auth = jwt({secret: process.env.SECRET, userProperty: 'payload'})
    
    // GET routes

    // GET all news
    router.get('/news', function(req, res, err) {
        News.findAll({
            include: [{
                model: User
            }]
        })
        .then(news => res.json(news))
        .catch(err => next(err))
    })

    //Get news with id
    router.get('/news/:id', function(req, res, next) {
        News.findById(req.params.id, {
            include: [{
                model: User
            }]
        })
        .then(news => {
            if(!news){
                throw new Error("News not found for id " + req.params.id)
            }
            res.json(news)
        })
        .catch(err => next(err))
    })

    //POST routes

    // Add news
    router.post('/news/author/:author', auth, function(req, res, next) {
        News.create(req.body)
        .then(news => {
            news.addUser(req.params.author)
            .then(user => News.findById(news.id, {
                include: [{
                    model: User
                }]
            }))
            .then(news => res.json(news))
        })
        .catch(err => next(err))
    })

    //PUT routes

    //Update news
    router.put('/news/:id/author/:author', auth, function(req, res, next) {
        News.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(news => News.findById(req.params.id))
        .then(news => {
            news.addUser(req.params.author)
            res.json(news)
        })
        .catch(err => next(err))
    })

    //DELETE routes

    //Delete news
    router.delete('/news/:id', auth, function(req, res, next) {
        News.findById(req.params.id)
        .then(news => {
            if(!news){
                throw new Error("News not found for id " + req.params.id)
            }
            News.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.json(news)
        })
        .catch(err => next(err))
    })
}