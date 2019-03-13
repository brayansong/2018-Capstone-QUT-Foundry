const passport = require("passport");
const jwtSecret = require("../config/jwtConfig");
const User = require("../models").User;
const UserInfo = require("../models").UserInfo;
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser(req, res, next) {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          User.findOne({
            where: {
              email: user.email
            }
          }).then(user => {
            user.update({
              active: true
            });
            UserInfo.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              dob: req.body.dob,
              gender: req.body.gender,
              userId: user.id
            }).then(() => {
              console.log("user created in db");
              res.status(200).send({message: "user created"});
            });
          });
        });
      }
    })(req, res, next);
  },
  login(req, res, next) {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.status(401).send(info.message);
      } else {
        req.logIn(user, err => {
          User.findOne({
            where: {
              email: user.email
            }
          }).then(user => {
            const token = jwt.sign({email: user.email}, jwtSecret.secret, {
              expiresIn: "14 d"
            });
            res.status(200).send({
              auth: true,
              token: token,
              message: user.email + " login successful"
            });
          });
        });
      }
    })(req, res, next);
  },
  permission(userType = ["coach", "sub-coach", "client"]) {
    return (req, res, next) => {
      // handling
      passport.authenticate("jwt", (err, user, info) => {
        if (err) {
          console.log(err);
        }
        if (info != undefined) {
          console.log(info.message);
          res.status(401).send(info.message);
        } else {
          req.user = user;
          console.log(
            "JWT!!!!!!!!" +
              " User with ID " +
              req.user.id +
              " email is " +
              req.user.email +
              "!!!!!!!!!!!!!!!!"
          );
          next();
        }
      })(req, res, next);
    };
  }
};
