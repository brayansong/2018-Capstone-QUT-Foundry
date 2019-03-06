const usersController = require("../controllers").users;

module.exports = app => {
  app.post("/api/users", usersController.create);
  app.get("/api2", (req, res) =>
    res.status(200).send({
      message: "api222 get test"
    })
  );
};
