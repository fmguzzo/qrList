const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
import Site from "../models/siteModel";

const passport = require("passport");
const authenticate = require("../middleware/authMiddleware");
const cors = require("../middleware/corsMiddleware");

router.options("*", cors.corsWithOptions, (req, res, next) => {
  res.Status(200);
});

router.get(
  "/",
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  function (req, res, next) {
    User.find({})
      .then(
        (users) => {
          res.status(200);
          res.header("Content-Type", "application/json");
          res.json(users);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

router.post("/signup", cors.corsWithOptions, (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        /*
        res.status(500);
        res.header("Content-Type", "application/json");
        res.json({ err: err });
        */
        const error = new Error(err.message);
        error.status = "500";
        return next(error);
      } else {
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        if (req.body.email) user.email = req.body.email;
        user.save((err, user) => {
          if (err) {
            /*
            res.status(500);
            res.header("Content-Type", "application/json");
            res.json({ err: err });
            return;
            */
            const error = new Error(err.message);
            error.status = "500";
            return next(error);
          }
          Site.create({ owner: user._id }).then(
            (site) => {
              passport.authenticate("local")(req, res, () => {
                res.status(200);
                res.header("Content-Type", "application/json");
                res.json({
                  success: true,
                  site: site._id,
                  status: "Registration Successful!",
                });
              });
            },
            (err) => next(err)
          );
        });
      }
    }
  );
});

//passport.authenticate('local') -> (req.user)
/** passport.authenticate('local') como middleware
 * router.post('/login', passport.authenticate('local'), (req, res) => {}
 * */
router.post("/login", cors.corsWithOptions, (req, res, next) => {
  //err -> error / info -> user does not exist
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      /*
      res.status(401);
      res.header("Content-Type", "application/json");
      res.json({ success: false, status: "Login Unsuccessful!", err: info });
      */
      const error = new Error(info.message);
      error.status = "401";
      return next(error);
    }

    //req.logIn -> method incorporated by passport.authenticate()
    req.logIn(user, (err) => {
      if (err) {
        /*
        res.status(401);
        res.header("Content-Type", "application/json");
        res.json({
          success: false,
          status: "Login Unsuccessful!",
          err: "Could not login user!",
        });
        */
        const error = new Error(err.message);
        error.status = "401";
        return next(error);
      }

      Site.findOne({ owner: req.user._id }).then(
        (site) => {
          if (!site) {
            const error = new Error("Site document does not exist");
            error.status = "401";
            return next(error);
          }
          const token = authenticate.getToken({ _id: req.user._id });
          res.status(200);
          res.header("Content-Type", "application/json");
          res.json({
            _id: user._id,
            idSite: site._id,
            username: user.username,
            admin: user.admin,
            success: true,
            token: token,
          });
        },
        (err) => next(err)
      );
    });
  })(req, res, next); //router callback parameter por no usarlo como middleware
});

router.get(
  "/facebook/token",
  cors.corsWithOptions,
  passport.authenticate("facebook-token"),
  (req, res) => {
    if (req.user) {
      const token = authenticate.getToken({ _id: req.user._id });
      res.status(200);
      res.header("Content-Type", "application/json");
      res.json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
      });
    }
  }
);

router.get("/checkJWTtoken", cors.corsWithOptions, (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT invalid!", success: false, err: info });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT valid!", success: true, user: user });
    }
  })(req, res, next); //add callback parameter
});

module.exports = router;
