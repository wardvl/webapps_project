// Load express module
var express = require('express');

// Contains an instance of the express router
var router = express.Router();

let jwt = require('express-jwt')

module.exports = function(app, config) {

    let auth = jwt({secret: process.env.SECRET, userProperty: 'payload'})

    // Load news API routes
    require('./news')(router, config)

    // Load users API routes
    require('./users')(router, config)

    // Load gigs API routes
    require('./gigs')(router, config)

    // Load venues API routes
    require('./venues')(router, config)
      
    // TODO: Load more API routes here    

    // Return router
    return router;
}