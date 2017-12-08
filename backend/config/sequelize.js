var SequelizeSeeder = require('../helpers/sequelize-seeder');

// Load sequelize module
var Sequelize = require('sequelize');

// Export sequelize configuration
module.exports = function(app, config) {

    // Contains the sequelize options
    let sequelizeOptions = {
        operatorsAliases: Sequelize.Op,
        seederStorage: "sequelize",
        logging: console.log,
        dialect: 'mysql',
        pool:{
            "max": 1,
            "idle": 20000,
            "acquire": 20000
         },
        define: {
            timestamps: true, // Add the timestamp attributes (updated_at, created_at)
            paranoid: true,   // Don't delete database entries but set deleted_ad
            underscored: true // Don't use camelcase for automatically added attributes
        }
    };

    // Contains the sequelize connection
    config.sequelize = new Sequelize(config.dbUri, sequelizeOptions);

    // Create news model
    var News = require('../models/news')(config)

    // Create venue model
    var Venue = require('../models/venue')(config)

    // Create gig model
    var Gig = require('../models/gig')(config)

    // Create user model
    var User = require('../models/user')(config)

    // Create userNews model
    var UserNews = require('../models/user_news')(config)

    // Create class database table
    config.sequelize.sync({ force: true })
    .then(res => SequelizeSeeder.seedModelFromJsonFile(User, config.rootPath +'/backend/models/seederfiles/users.json'))
    .then(res => SequelizeSeeder.seedModelFromJsonFile(News, config.rootPath +'/backend/models/seederfiles/news.json'))
    .then(res => SequelizeSeeder.seedModelFromJsonFile(UserNews, config.rootPath +'/backend/models/seederfiles/news_users.json'))
    .then(res => SequelizeSeeder.seedModelFromJsonFile(Venue, config.rootPath +'/backend/models/seederfiles/venues.json'))
    .then(res => SequelizeSeeder.seedModelFromJsonFile(Gig, config.rootPath +'/backend/models/seederfiles/gigs.json'))
}