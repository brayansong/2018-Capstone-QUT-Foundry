const passport = require("passport");
const jwtSecret = require("../config/jwtConfig");
const User = require("../models").User;
const RegisterToken = require("../models").RegisterToken;
const UserInfo = require("../models").UserInfo;
const jwt = require("jsonwebtoken");
var NodeMailer = require('../../nodeMailerWithTemp');
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

require("dotenv").config();

const PASSWORD_SALT = 12;
module.exports = {

  registerUser(req, res, next) {
    RegisterToken.findOne({
      where: {
        email: req.query.email,
        token: req.query.token,

      }
    })
      .then(token => {
        if (!token) {
          console.log(token)

          res.status(400).send({ message: "Token not exist" });
        }
        else {
          passport.authenticate("register", (err, user, info) => {
            if (err) {
              res.status(400).send({ message: "register unsuccessful" });
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
                    userId: user.id,
                  })
                    .then(() => {
                      token.destroy()
                        .then(() => {
                          res.status(200).send({ message: "user created" });
                        })
                    })

                });
              });
            }
          })(req, res, next);
        }

      })


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
            const token = jwt.sign({ email: user.email }, jwtSecret.secret, {
              expiresIn: "365 d"
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
  permission(role = ["admin", "mentor", "entrepreneur"], user = ['me', 'admin', 'others']) {
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
  },
  forgotPassword(req, res, next) {
    if (req.body.email === undefined) {
      res.status(400).send({ message: "email address is needed" });
    }

    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "There are no responding user"
          });

        }

        var users = [
          {
            name: req.body.name,
            email: req.body.email
          }
        ]
        NodeMailer.loadTemplate('resetPassword', users)
          .then((results) => {
            return Promise.all(
              results.map((result) => {
                console.log(result)
                NodeMailer.sendEmail({
                  to: result.context.email,
                  subject: result.email.subject,
                  html: result.email.html,
                  text: result.email.text
                })
              })).then(() => {
                res.status(200).send({ message: "email sent" });
              })
          })
      })
      .catch(error => res.status(400).send(error));

  },
  registerInvitation(req, res, next) {
    if (req.body.name === undefined || req.body.email === undefined || req.body.role === undefined) {
      res.status(400).send({ message: "missing credential" });
    }

    var users = [
      {
        name: req.body.name,
        email: req.body.email
      }
    ]
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {

        if (user) {
          return res.status(404).send({
            message: "This email is already exist "
          });

        }

        if (!req.body.email.includes(["@qut.edu.au"]) || !req.body.email.includes(["@connect.qut.edu.au"])) {
          return res.status(404).send({
            message: "This email is not a qut email "
          });
        }
        const token = jwt.sign({ email: req.body.email, createdAt: Date.now(), role: req.body.role }, jwtSecret.secret, {
          expiresIn: "7 d"
        });
        RegisterToken.create({
          token: token,
          email: req.body.email,
        })
          .then(result => {

            var users = [
              {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                link: process.env.HOST_NAME + "/register?email=" + req.body.email + "&token=" + result.token
              }
            ]
            NodeMailer.loadTemplate('registerInvitation', users)
              .then((results) => {
                return Promise.all(
                  results.map((result) => {
                    console.log(result)
                    NodeMailer.sendEmail({
                      to: result.context.email,
                      subject: result.email.subject,
                      html: result.email.html,
                      text: result.email.text
                    })
                  })).then(() => {
                    res.status(200).send({ message: "email sent" });
                  })
              })
          })


      })
      .catch(error => res.status(400).send(error));
  },
};

