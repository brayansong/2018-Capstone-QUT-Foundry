const Expertise = require("../models").Expertise;

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
    var filter = req.query.filter //!= undefined ? [ JSON.parse(req.query.filter)] : null ;
    return Expertise.findAll({

      where: {
        userId: req.user.id,
      },
      order: [
        [sort, order]
      ],

    })
      .then(expertises => {

        if (!expertises) {
          res.append('X-Total-Count', 0);
          return res.status(404).send({
            message: "There are no expertise"
          });
        }
        var result = expertises.filter((exercise, key) => key >= start && key < end)
        res.append('X-Total-Count', expertises.length);

        return res.status(200).send(result);
      })
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    return Expertise.create({
      title: req.body.title,
      userId: req.user.id,
    })
      .then(expertises => res.status(201).send(expertises))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Expertise.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(expertise => {
        if (!expertise) {
          return res.status(404).send({
            message: "There are no responding expertise"
          });
        }
        return res.status(200).send(expertise);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Expertise.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(expertise => {
        if (!expertise) {
          return res.status(404).send({
            message: "There are no responding expertise"
          });
        }
        return expertise
          .update({
            title: req.body.title,
            userId: req.user.id,
          })
          .then(expertises => res.status(201).send(expertises))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Expertise.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(expertises => {
        if (!expertises) {
          return res.status(404).send({
            message: "Expertise Not Found"
          });
        }
        return expertises
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
