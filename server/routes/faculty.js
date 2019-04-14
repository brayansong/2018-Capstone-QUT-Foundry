const facultyController = require("../controllers").faculty;
const authenticationsController = require("../controllers").authentications;

module.exports = app => {

  app.route("/api/faculties")
    .get(authenticationsController.permission(), facultyController.list)
    .post(authenticationsController.permission(), facultyController.create)

  app.route("/api/faculties/:id")
    .get(authenticationsController.permission(), facultyController.retrieve)
    .put(authenticationsController.permission(user = ['me', 'admin']), facultyController.update)
    .delete(authenticationsController.permission(user = ['me', 'admin']), facultyController.destroy)

};
