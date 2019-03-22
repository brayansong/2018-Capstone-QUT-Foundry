const authenticationsController = require("../controllers").authentications;

module.exports = app => {


  app.route("/api/register").post(authenticationsController.registerUser);
  app.route("/api/login/").post(authenticationsController.login);
  app
    .route("/api/jwt-verify")
    .get(authenticationsController.permission(), (req, res) =>
      res.status(200).send({
        message: "jwt token exists"
      }))
  app.route("/api/register/invitation").post(authenticationsController.registerInvitation);
  app.route("/api/forgot-password").post(authenticationsController.forgotPassword);
};
