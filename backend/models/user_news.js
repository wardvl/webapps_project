/**
 * Contains the sequelize module
 */
var Sequelize = require('sequelize');

/**
 * Contains the userNews table information
 */
var UserNewsTable = {
}

// Create and export userNews model
module.exports = function(config) {
    const UserNews = config.sequelize.define('userNews', UserNewsTable);

    const User = config.sequelize["modelManager"].getModel('user');
    const News = config.sequelize["modelManager"].getModel('news');

    User.belongsToMany(News, { through: UserNews })
    News.belongsToMany(User, { through: UserNews })

    return UserNews;
}