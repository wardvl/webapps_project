// Load path module
var path = require('path');

// Export configuration object
module.exports = {

    // Contains the root path
    rootPath: path.normalize(__dirname + '/../../'),
    
    // Contains the server port
    port: process.env.PORT || 8080,

    // Contains the development environment state
    get isDevelopment() { return (process.env.NODE_ENV) || 'development' === 'development'; },
    
    // Contains the db host
    dbHost: process.env.DBHOST,

    // Contains the db port
    dbPort: process.env.DBPORT,

    // Contains the db name
    dbName: process.env.DBNAME,
    
    // Contains the db uri
    get dbUri() { return 'mysql://' + this.dbHost + ':' + this.dbPort + '/' + this.dbName },

    // Contains the sequelize connection (Loaded by config/sequelize)
    sequelize: null,

    // Contains wheter we will recreate the database tables
    get forceCreateTables() { return this.isDevelopment && true}
}
