const Faculty = require("../models").Faculty;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

module.exports = {

  list(req, res) {
    console.log(req.query._end)
    console.log(req.query._order)
    console.log(req.query._sort)
    console.log(req.query._start)

    var end = req.query._end
    var order = req.query._order
    var sort = req.query._sort //!= undefined ? [ JSON.parse(req.query.sort)] : null ;
    var start = req.query._start
    var range = req.query.range //!= undefined ?  JSON.parse(req.query.range) : [0, 999999999999999999999999999999] ;
    var filter = req.query.q != undefined ? req.query.q.split("").join('%') : '';
    return Faculty.findAll({

      where: {
        userId: req.user.id,
      },
      order: [
        [sort, order]
      ],

    })
      .then(faculties => {

        if (!faculties) {
          res.append('X-Total-Count', 0);
          return res.status(404).send({
            message: "There are no faculty "
          });
        }
        var result = faculties.filter((exercise, key) => key >= start && key < end)
        res.append('X-Total-Count', faculties.length);

        return res.status(200).send(result);
      })
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    return Faculty.create({
      faculty: req.body.faculty,
      userId: req.user.id,
    })
      .then(faculties => res.status(201).send(faculties))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Faculty.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(faculty => {
        if (!faculty) {
          return res.status(404).send({
            message: "There are no responding faculty "
          });
        }
        return res.status(200).send(faculty);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Faculty.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(faculty => {
        if (!faculty) {
          return res.status(404).send({
            message: "There are no responding faculty "
          });
        }
        return faculty
          .update({
            faculty: req.body.faculty,
          })
          .then(faculties => res.status(201).send(faculties))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Faculty.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(faculties => {
        if (!faculties) {
          return res.status(404).send({
            message: "Faculty  Not Found"
          });
        }
        return faculties
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
