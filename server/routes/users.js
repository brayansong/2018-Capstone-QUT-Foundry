const usersController = require("../controllers").users;

module.exports = app => {
  app
    .route("/api/user")
    .get(usersController.list)
    .post(usersController.create);

  app
    .route("/api/user/:id")
    .get(usersController.retrieve)
    .put(usersController.update)
    .delete(usersController.destroy);
};
