module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "api get test"
    })
  );

  require("./users")(app);
  require("./authentications")(app);

  require("./expertise")(app);
  require("./availableTime")(app);
  require("./booking")(app);
  require("./faculty")(app);

};
