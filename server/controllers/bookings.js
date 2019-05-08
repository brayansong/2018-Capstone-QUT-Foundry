const Booking = require("../models").Booking;
const AvailableTime = require("../models").AvailableTime;
const UserInfo = require("../models").UserInfo;
const MentorProgram = require("../models").MentorProgram;


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
    return Booking.findAll({

      where: {
        // attendantId: req.user.id,
      },
      order: [
        [sort, order]
      ],
      include: [{
        model: AvailableTime,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }, {
        model: UserInfo,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }, {
        model: MentorProgram,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }],
      attributes: { exclude: ['availableTimeID', 'attendantId', "mentorProgramId"] },
    })
      .then(books => {

        if (!books) {
          res.append('X-Total-Count', 0);
          return res.status(404).send({
            message: "There are no booking "
          });
        }
        var result = books.filter((exercise, key) => key >= start && key < end)
        res.append('X-Total-Count', books.length);

        return res.status(200).send(result);
      })
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    return Booking.create({
      availableTimeID: req.body.availableTimeID,
      attendantId: req.user.id,
      mentorProgramId: req.body.mentorProgramId,
      location: req.body.location,
    })
      .then(books => res.status(201).send(books))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Booking.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: AvailableTime,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }, {
        model: UserInfo,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }, {
        model: MentorProgram,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }],
      attributes: { exclude: ['availableTimeID', 'attendantId', "mentorProgramId"] },
    })
      .then(booking => {
        if (!booking) {
          return res.status(400).send({
            message: "There are no responding booking "
          });
        }
        return res.status(200).send(booking);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Booking.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(booking => {
        if (!booking) {
          return res.status(404).send({
            message: "There are no responding booking "
          });
        }
        return booking
          .update({
            availableTimeID: req.body.availableTimeID,
            attendantId: req.user.userId,
            mentorProgramId: req.body.mentorProgramId,
            location: req.body.location,
          })
          .then(books => res.status(201).send(books))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Booking.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(books => {
        if (!books) {
          return res.status(404).send({
            message: "Booking  Not Found"
          });
        }
        return books
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
