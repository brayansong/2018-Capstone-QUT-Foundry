const jwtSecret = require("./jwtConfig");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");

module.exports = function (passport, User) {
  const PASSWORD_SALT = 12;
  const Op = Sequelize.Op;

  console.log(User);
  const localStrategy = require("passport-local").Strategy,
    JWTstrategy = require("passport-jwt").Strategy,
    ExtractJWT = require("passport-jwt").ExtractJwt;

  passport.use(
    "register",
    new localStrategy(
      {
        username: "email",
        password: "password",
        //passReqToCallback: true, // allows us to pass back the entire request to the callback
        session: false
      },
      (email, password, done) => {
        console.log(email)
        if (!email.includes(["@qut.edu.au"]) || !email.includes(["@connect.qut.edu.au"])) {
          return done(null, false, {
            message: "This email is not a qut email "
          });
        }

        try {
          User.findOne({
            where: {
              email: email
            }
          }).then(user => {
            if (user != null) {
              //user with that detail is founded
              return done(null, false, {
                message: "email already taken"
              });
            } else {
              //new user detail
              bcrypt.hash(password, PASSWORD_SALT).then(hashedPassword => {
                User.create({
                  email,
                  password: hashedPassword
                }).then(user => {
                  return done(null, user);
                });
              });
            }
          });
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        username: "email",
        password: "password",
        session: false
      },
      (email, password, done) => {
        try {
          User.findOne({
            where: {
              email: email
            }
          }).then(user => {
            if (user === null) {
              return done(null, false, {
                message: " User with email:" + email + " doesn't exist"
              });
            } else {
              bcrypt.compare(password, user.password).then(response => {
                if (response !== true) {
                  return done(null, false, {
                    message: {
                      message: "passwords do not match"
                    }
                  });
                }
                //user found & authenticated
                return done(null, user);
              });
            }
          });
        } catch (err) {
          done(err);
        }
      }
    )
  );

  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("BEARER"),
    secretOrKey: jwtSecret.secret
  };

  passport.use(
    "jwt",
    new JWTstrategy(opts, (jwt_payload, done) => {
      try {
        User.findOne({
          where: {
            email: jwt_payload.email
          }
        }).then(user => {
          if (user) {
            console.log("user found in db in passport");
            done(null, user);
          } else {
            console.log("user not found in db");
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    })
  );
};
