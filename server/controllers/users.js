const User = require("../models").User;
const UserInfo = require("../models").UserInfo;

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
    console.log("i am search list user")
    console.log(req.query._end)
    console.log(req.query._order)
    console.log(req.query._sort)
    console.log(req.query._start)

    var end = req.query._end
    var order = req.query._order
    var sort = req.query._sort //!= undefined ? [ JSON.parse(req.query.sort)] : null ;
    var start = req.query._start
    var range = req.query.range //!= undefined ?  JSON.parse(req.query.range) : [0, 999999999999999999999999999999] ;
    var filter = req.query.filter //!= undefined ? [ JSON.parse(req.query.filter)] : null ;
    return User.findAll({

      where: {
        userId: req.user.id,
      },
      order: [
        [sort, order]
      ],

    })
      .then(users => {

        if (!users) {
          res.append('X-Total-Count', 0);
          return res.status(404).send({
            message: "There are no user "
          });
        }
        var result = users.filter((exercise, key) => key >= start && key < end)
        res.append('X-Total-Count', users.length);

        return res.status(200).send(result);
      })
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {

    console.log("searching")
    if (req.query._end !== undefined && req.query._order !== undefined && req.query._sort && req.query._start !== undefined) {
      console.log("i am search list user")
      console.log(req.query._end)
      console.log(req.query._order)
      console.log(req.query._sort)
      console.log(req.query._start)

      var end = req.query._end
      var order = req.query._order
      var sort = req.query._sort //!= undefined ? [ JSON.parse(req.query.sort)] : null ;
      var start = req.query._start
      return User.findAll({
        order: [
          [sort, order]
        ],
        include: [{ model: UserInfo }]
      })
        .then(users => {
          console.log("i am here no w")
          console.log(users)
          if (!users) {
            res.append('X-Total-Count', 0);
            return res.status(404).send({
              message: "There are no user "
            });
          }

          var result = users.filter((user, key) => key >= start && key < end)
          res.append('X-Total-Count', users.length);

          return res.status(200).send(result);
        })
        .catch(error => res.status(400).send(error));
    }
    else {
      return User.findOne({
        where: {
          id: req.query.id
        },
        include: [{ model: UserInfo }]
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
    }
  },
  personal(req, res) {
    return User.findOne({
      where: {
        email: user.email
      },
    }).then(user => {
      UserInfo.findOne({
        where: {
          userId: user.id
        },
        include: [{
          model: UserType,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }],

      })
        .then(userInfo => {
          res.status(200).send({
            email: user.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            dob: userInfo.dob,
            gender: userInfo.gender,
            userId: userInfo.userId,
            userType: userInfo.UserType.type,
            qutId: userInfo.qutId,

          });
        })

    });
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
