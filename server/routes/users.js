const usersController = require("../controllers").users;
const authenticationsController = require("../controllers").authentications;

module.exports = app => {
  app.route("/api/register/").post(authenticationsController.registerUser);
  app.route("/api/login/").post(authenticationsController.login);

  app
    .route("/api/user")
    .get(authenticationsController.permission(), usersController.list)
    .post(usersController.create);

  app
    .route("/api/user/:id")
    .get(usersController.retrieve)
    .put(usersController.update)
    .delete(usersController.destroy);
};
