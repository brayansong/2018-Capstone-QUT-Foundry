const mentorProgramController = require("../controllers").mentorProgram;
const authenticationsController = require("../controllers").authentications;

module.exports = app => {

  app.route("/api/mentorPrograms")
    .get(authenticationsController.permission(), mentorProgramController.list)
    .post(authenticationsController.permission(), mentorProgramController.create)

  app.route("/api/mentorPrograms/:id")
    .get(authenticationsController.permission(), mentorProgramController.retrieve)
    .put(authenticationsController.permission(user = ['me', 'admin']), mentorProgramController.update)
    .delete(authenticationsController.permission(user = ['me', 'admin']), mentorProgramController.destroy)

};
