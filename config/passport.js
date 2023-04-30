const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user') 

module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(new LocalStrategy({ usernameField: 'email' ,passReqToCallback: true}, (req, email, password, done) => {
        User.findOne({ email })
          .then(user => {
            if(email.length ===0 ){
              return done(null, false, req.flash("warning_msg", "email?!"))
            }


            if (!user) {
              return done(null, false, req.flash("warning_msg", "This email is not registered!"))
            }
            if (user.password !== password) {
              return done(null, false, req.flash("warning_msg", "email or password incorrect!"))
            }
            return done(null, user)
          })
          .catch(err => done(err, false))
      }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()
            .then(user => done(null, user))
            .catch(err => done(err, null))
    })
}