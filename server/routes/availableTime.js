const availableTimeController = require("../controllers").availableTime;
const authenticationsController = require("../controllers").authentications;

module.exports = app => {

  app.route("/api/availableTimes")
    .get(authenticationsController.permission(), availableTimeController.list)
    .post(authenticationsController.permission(), availableTimeController.create)

  app.route("/api/availableTimes/:id")
    .get(authenticationsController.permission(), availableTimeController.retrieve)
    .put(authenticationsController.permission(user = ['me', 'admin']), availableTimeController.update)
    .delete(authenticationsController.permission(user = ['me', 'admin']), availableTimeController.destroy)

};
