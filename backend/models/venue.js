/**
 * Contains the sequelize module
 */
var Sequelize = require('sequelize');

/**
 * Contains the venue table information
 */
var VenueTable = {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: Sequelize.STRING, allowNull: false },
    address_street: { type: Sequelize.STRING, allowNull: true },
    address_number: { type: Sequelize.STRING, allowNull: true},
    address_city: { type: Sequelize.STRING, allowNull: true},
    address_postalcode: { type: Sequelize.STRING, allowNull: true },
    telephone: { type: Sequelize.STRING, allowNull: true }
}

// Create and export venue model
module.exports = function(config) {
    const Venue = config.sequelize.define('venue', VenueTable);

    return Venue;
}