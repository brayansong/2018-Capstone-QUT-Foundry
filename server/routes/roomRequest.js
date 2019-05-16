const roomRequestsController = require("../controllers").roomRequests;
const authenticationsController = require("../controllers").authentications;

module.exports = app => {

  app.route("/api/roomRequest")
    .get(authenticationsController.permission(), roomRequestsController.list)
    .post(authenticationsController.permission(), roomRequestsController.create)

  app.route("/api/roomRequest/:id")
    .get(authenticationsController.permission(), roomRequestsController.retrieve)
    .put(authenticationsController.permission(user = ['me', 'admin']), roomRequestsController.update)
    .delete(authenticationsController.permission(user = ['me', 'admin']), roomRequestsController.destroy)

};
