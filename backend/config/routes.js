// Load express module
var express = require('express');

// Load path module
var path = require('path');

// Export express routes configuration
module.exports = function(app, config) {


    // Loads the API routes
    var apiRoutes = require("../routes/api")(app, config);

    // Register static files middleware
    app.use(express.static(path.join(config.rootPath, 'dist')));

    // Register api routes middleware
    app.use('/api', apiRoutes);

    // Register default route
    app.get('*', function(req, res) {
        res.sendFile(path.join(config.rootPath, 'dist/index.html'));
    });
}
