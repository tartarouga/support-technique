var passport = require("passport");
var BearerStrategy = require("passport-http-bearer").Strategy;
var User = require("./models/userSchema");
var jwt = require("jsonwebtoken");

passport.use(
  new BearerStrategy(function (token, done) {
    jwt.verify(token, "secret", function (err, decoded) {
      if (err) {
        return done(err);
      }
      User.findOne({ _id: decoded.data._id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  })
);
