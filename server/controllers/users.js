const User = require("../models").User;

module.exports = {
  create(req, res) {
    return User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob
    })
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {

    return User.findAll()
      .then(users => {
        if (!users) {
          return res.status(404).send({
            message: "There are no user"
          });
        }
        return res.status(200).send(users);
      })
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return User.findOne({
      where: {
        id: req.query.id
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "There are no responding user"
          });
        }
        return res.status(200).send([user]);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
      .then(User => res.status(201).send(User))
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return User.findById(req.params.userId, {})
      .then(users => {
        if (!users) {
          return res.status(404).send({
            message: "User Not Found"
          });
        }
        return users
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
