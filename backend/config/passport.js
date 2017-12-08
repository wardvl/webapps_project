var passport = require('passport');
var sequelize = require('sequelize');

module.exports = function (app, config) {
    
    var User = config.sequelize["modelManager"].getModel('user')
    var LocalStrategy = require('passport-local').Strategy

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        function (username, password, done) {
            User.findOne({
                where: {                    
                    email: username
                }
            })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {                    
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            })
            .catch(err => done(err))
        }));

        app.use(passport.initialize())
}