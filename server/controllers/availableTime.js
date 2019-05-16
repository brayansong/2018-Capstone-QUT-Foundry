const AvailableTime = require("../models").AvailableTime;
const Booking = require("../models").Booking;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

module.exports = {

  list(req, res) {
    console.log(req.query._end)
    console.log(req.query._order)
    console.log(req.query._sort)
    console.log(req.query._start)

    if (req.query._end === undefined && req.query._order === undefined && req.query._sort === undefined && req.query._start === undefined) {
      return AvailableTime.findAll({

        where: {
          userId: req.user.id,
          /* startDate: */
        },
        order: [
        ],

      })
        .then(availableTimes => res.status(200).send(availableTimes))
    }

    var end = req.query._end
    var order = req.query._order
    var sort = req.query._sort //!= undefined ? [ JSON.parse(req.query.sort)] : null ;
    var start = req.query._start
    var range = req.query.range //!= undefined ?  JSON.parse(req.query.range) : [0, 999999999999999999999999999999] ;
    var filter = req.query.q != undefined ? req.query.q.split("").join('%') : '';
    var userId = req.query.include === undefined ? [req.user.id] : [0, 999999999999999999999999999999]

    return AvailableTime.findAll({

      where: {
        userId: {
          [Op.between]: userId,
        },
        startDate: {
          [Op.gte]: new Date()
        }
      },
      order: [
        [sort, order]
      ],

    })
      .then(availableTimes => {

        if (!availableTimes) {
          res.append('X-Total-Count', 0);
          return res.status(404).send({
            message: "There are no availableTime"
          });
        }
        if (req.query.include !== "all") {
          availableTimes = availableTimes.filter((availableTime, key) => req.query.include.includes(availableTime.userId))
        }

        var availableTimeList = availableTimes.map(availableTime => {
          availableTime.id
        })
        Booking.findAll({
          where: {
            availableTimeID: {
              [Op.in]: availableTimeList
            }
          }
        })
          .then(booking => {
            console.log("booking")
            console.log(booking)


            res.append('X-Total-Count', availableTimes.length);

            return res.status(200).send(availableTimes);
          })


      })
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    return AvailableTime.create({
      title: req.body.title,
      userId: req.user.id,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    })
      .then(availableTimes => res.status(201).send(availableTimes))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return AvailableTime.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(availableTime => {
        if (!availableTime) {
          return res.status(404).send({
            message: "There are no responding availableTime"
          });
        }
        return res.status(200).send(availableTime);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return AvailableTime.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(availableTime => {
        if (!availableTime) {
          return res.status(404).send({
            message: "There are no responding availableTime"
          });
        }
        return availableTime
          .update({
            title: req.body.title,
            userId: req.user.id,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
          })
          .then(availableTimes => res.status(201).send(availableTimes))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return AvailableTime.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(availableTimes => {
        if (!availableTimes) {
          return res.status(404).send({
            message: "AvailableTime Not Found"
          });
        }
        return availableTimes
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
