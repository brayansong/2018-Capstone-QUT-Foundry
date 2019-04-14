const expertiseController = require("../controllers").expertise;
const authenticationsController = require("../controllers").authentications;

module.exports = app => {

  app.route("/api/expertises")
    .get(authenticationsController.permission(), expertiseController.list)
    .post(authenticationsController.permission(), expertiseController.create)

  app.route("/api/expertises/:id")
    .get(authenticationsController.permission(), expertiseController.retrieve)
    .put(authenticationsController.permission(user = ['me', 'admin']), expertiseController.update)
    .delete(authenticationsController.permission(user = ['me', 'admin']), expertiseController.destroy)

};
