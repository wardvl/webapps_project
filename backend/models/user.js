/**
 * Contains the sequelize module
 */
let Sequelize = require('sequelize');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

/**
 * Contains the user table information
 */

var UserTable = {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    hash: {
        type: Sequelize.STRING, allowNull: false,
        set(password) {
            let salt = crypto.randomBytes(32).toString('hex')
            this.setDataValue('salt', salt)
            this.setDataValue('hash', crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex'))
        }
    },
    salt: { type: Sequelize.STRING, allownNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    role: { type: Sequelize.ENUM("ADMIN", "CONTENT MANAGER", "GUEST"), allowNull: false }
}

var getterMethods = {

}


// Create and export user model
module.exports = function (config) {
    const User = config.sequelize.define('user', UserTable, getterMethods);

    User.prototype.validPassword = function (password) {
        let salt = this.getDataValue('salt')
        let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
        return hash === this.getDataValue('hash')
    }

    User.prototype.jwt = function () {
        var today = new Date()
        var exp = new Date(today)
        exp.setDate(today.getDate() + 60)
        console.log('jwt called')
        return jwt.sign({
            _id: this.getDataValue('id'),
            email: this.getDataValue('email'),
            role: this.getDataValue('role'),
            exp: parseInt(exp.getTime() / 1000)
        }, process.env.SECRET)
    }

    return User;
}