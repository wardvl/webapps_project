/**
 * Contains the sequelize module
 */
var Sequelize = require('sequelize');

/**
 * Contains the news table information
 */
var NewsTable = {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    title: { type: Sequelize.STRING, allowNull: false},
    body: { type: Sequelize.STRING, allowNull: false },
    date: { type: Sequelize.DATE, allowNull: false }
}

// Create and export news model
module.exports = function(config) {
    const News = config.sequelize.define('news', NewsTable);

    return News;
}