// Load express module
var express = require('express');

// Create an instance of the application
var app = express();

// Contains the configuration parameters of the application
var config = require('./server/config/config');

// Load express configuration
require('./server/config/express')(app, config);

// Load express routes configuration
require('./server/config/routes')(app, config);

// Load mongoose configuration
require('./server/config/mongoose')(app, config);

// Start listening for requests
app.listen(config.port, function() {
	console.info("Successfully running the server on port " + config.port);
});