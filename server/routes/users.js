const usersController = require("../controllers").users;
const authenticationsController = require("../controllers").authentications;

module.exports = app => {
  app
    .route("/api/jwt-verify")
    .get(authenticationsController.permission(), (req, res) =>
      res.status(200).send({
        message: "jwt token exists"
      }))


  /*   app
      .route("/api/users")
      .get(authenticationsController.permission(), usersController.retrieve)
      .put(authenticationsController.permission(user = ['me', 'admin']), usersController.update)
      .delete(authenticationsController.permission(user = ['me', 'admin']), usersController.destroy)
   */



  app
    .route("/api/users")
    .get(authenticationsController.permission(), usersController.retrieve)
    .put(authenticationsController.permission(user = ['me', 'admin']), usersController.update)
    .delete(authenticationsController.permission(user = ['me', 'admin']), usersController.destroy)


  app
    .route("/api/personal")
    .get(authenticationsController.permission(), usersController.personal)
  //.put(authenticationsController.permission(user = ['me', 'admin']), usersController.personalUpdate)


};
