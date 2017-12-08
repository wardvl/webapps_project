// Load express module
var express = require('express');

// Load morgan module
var morgan = require('morgan');

// Load body-parser module
var bodyParser = require('body-parser');

// Export express configuration
module.exports = function(app, config) {

    // Register morgan middleware with dev formatting
    app.use(morgan('dev'));

    // Register body-parser middleware for parsing application/json requests
    app.use(bodyParser.json());

    // Register body-parser middleware for application/x-www-form-urlencoded requests
    app.use(bodyParser.urlencoded({ extended: true }));
}
