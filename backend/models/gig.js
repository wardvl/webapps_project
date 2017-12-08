/**
 * Contains the sequelize module
 */
var Sequelize = require('sequelize');

/**
 * Contains the gig table information
 */
var GigTable = {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    description: { type: Sequelize.STRING, allowNull: false },
    date: { type: Sequelize.DATE, allowNull: false },
}

// Create and export gig model
module.exports = function(config) {
    const Gig = config.sequelize.define('gig', GigTable);
    const Venue = config.sequelize["modelManager"].getModel('venue')

    Gig.belongsTo(Venue, {
        foreignKey: {
            allowNull: true
        }
    })
    Venue.hasMany(Gig)

    return Gig;
}