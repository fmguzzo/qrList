var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken"); // Create, sign, and verify tokens
var FacebookTokenStrategy = require("passport-facebook-token");

var User = require("../models/userModel");

//const config = require('./config');
import config from "../config";

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config.jwtSecretKey, { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecretKey;

//done -> callback provided by passport
exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyAdmin = (req, res, next) => {
  /* passport.authenticate() assign req.user */
  if (req.user && req.user.admin) {
    next();
  } else {
    const err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    return next(err);
  }
};

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.facebookPassport = passport.use(
  new FacebookTokenStrategy(
    {
      clientID: config.fbClientId,
      clientSecret: config.fbClientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (!err && user !== null) {
          return done(null, user);
        } else {
          user = new User({ username: profile.displayName });
          user.facebookId = profile.id;
          user.firstname = profile.name.givenName;
          user.lastname = profile.name.familyName;
          user.save((err, user) => {
            if (err) return done(err, false);
            else return done(null, user);
          });
        }
      });
    }
  )
);
