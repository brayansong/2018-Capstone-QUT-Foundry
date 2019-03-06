const User = require("../models").User;

module.exports = {
  create(req, res) {
    return Todo.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  }
};
