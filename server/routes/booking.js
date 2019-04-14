const bookingsController = require("../controllers").bookings;
const authenticationsController = require("../controllers").authentications;

module.exports = app => {

  app.route("/api/bookings")
    .get(authenticationsController.permission(), bookingsController.list)
    .post(authenticationsController.permission(), bookingsController.create)

  app.route("/api/bookings/:id")
    .get(authenticationsController.permission(), bookingsController.retrieve)
    .put(authenticationsController.permission(user = ['me', 'admin']), bookingsController.update)
    .delete(authenticationsController.permission(user = ['me', 'admin']), bookingsController.destroy)

};
