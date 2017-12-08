// Load express module
var express = require('express');

// Create an instance of the application
var app = express();

// Contains the configuration parameters of the application
var config = require('./backend/config/config');

// Load express configuration
require('./backend/config/express')(app, config);

// Load sequelize configuration
require('./backend/config/sequelize')(app, config);

// Load express routes configuration
require('./backend/config/routes')(app, config);

// Load passport configuration
require('./backend/config/passport')(app, config);

// Start listening for requests
app.listen(config.port, function() {
	console.info("Successfully running the server on port " + config.port);
});