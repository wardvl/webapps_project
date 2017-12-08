let jwt = require('express-jwt')

// Export Class routes
module.exports = function(router, config) {
    
        // Require gig model
        const Gig = config.sequelize["modelManager"].getModel('gig');

        // Require venue model
        const Venue = config.sequelize["modelManager"].getModel('venue');

        let auth = jwt({secret: process.env.SECRET, userProperty: 'payload'})
        
        // GET routes
    
        // GET gigs
        router.get('/gigs', function(req, res, err) {
            Gig.findAll({
                include: [{
                    model: Venue
                }]
            })
            .then(gig => res.json(gig))
            .catch(err => next(err))
        })

        // GET gig with id
        router.get('/gig/:id', function(req, res, next) {
            Gig.findById(req.params.id, {
                include: [{
                    model: Venue
                }]
            })
            .then(gig => {
                if(!gig) {
                    throw new Error('Gig not found for id ' + req.params.id)
                }
                res.json(gig)
            })
            .catch(err => next(err))
        })
    
        //POST routes
    
        // Add gig
        router.post('/gig/venue/:venue', auth, function(req, res, next) {
            Gig.create(req.body)
            .then(gig => {
                gig.setVenue(req.params.venue)
                res.json(gig)
            })
            .catch(err => next(err))
        })

        // Put routes

        //Update gig
        router.put('/gig/:id/venue/:venue', auth, function(req, res, next) {
            Gig.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(updated => {
                Gig.findById(req.params.id)
                .then(gig => {
                    gig.setVenue(req.params.venue)
                    res.json(gig)
                })                
            })
            .catch(err => next(err))
        })

        //Delete gig
        router.delete('/gig/:id', auth, function(req, res, next) {
            Gig.findById(req.params.id)
            .then(gig => {
                if(!gig) {
                    throw new Error('Gig not found for id ' + req.params.id)
                }
                Gig.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                res.json(gig)
            })
            .catch(err => next(err))
        })
    }