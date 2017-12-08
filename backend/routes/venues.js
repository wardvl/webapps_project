let jwt = require('express-jwt')

// Export Class routes
module.exports = function(router, config) {
    
        // Require venue model
        const Venue = config.sequelize["modelManager"].getModel('venue');

        let auth = jwt({secret: process.env.SECRET, userProperty: 'payload'})
        
        // GET routes
    
        // GET venue
        router.get('/venues', function(req, res, next) {
            Venue.findAll()
            .then(venue => res.json(venue))
            .catch(err => next(err))
        })

        // Get venue by id
        router.get('/venue/:id', function(req, res, next) {
            Venue.findById(req.params.id)
            .then(venue => {
                if(!venue) {
                    throw new Error('Venue not found for id ' + req.params.id)
                }
                res.json(venue)
            })
            .catch(err => next(err))
        })
    
        //POST routes
    
        // Add venue
        router.post('/venue', auth, function(req, res, next) {
            Venue.create(req.body)
            .then(venue => res.json(venue))
            .catch(err => next(err))
        })

        //PUT routes

        //Update venue
        router.put('/venue/:id', auth, function(req, res, next) {
            Venue.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(updated => {
                Venue.findById(req.params.id)
                .then(venue => res.json(venue))
            })
            .catch(err => next(err))
        })

        //DELETE routes

        //Delete venue
        router.delete('/venue/:id', auth, function(req, res, next) {
            Venue.findById(req.params.id)
            .then(venue => {
                if(!venue) {
                    throw new Error('Venue not found for id ' + req.params.id)
                }
                Venue.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                res.json(venue)
            })
            .catch(err => next(err))
        })
    }