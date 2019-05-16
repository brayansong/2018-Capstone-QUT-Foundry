const RoomRequest = require("../models").RoomRequest;
const Sequelize = require("sequelize");
const Booking = require("../models").Booking;
const AvailableTime = require("../models").AvailableTime;
const UserInfo = require("../models").UserInfo;
const MentorProgram = require("../models").MentorProgram;

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
    var where = {
      userId: req.user.id,
    }
    if (req.query.mentorBookingId !== undefined) {

      return RoomRequest.findOne({

        where: {
          mentorBookingId: req.query.mentorBookingId
        },

      })
        .then(roomRequests => {

          return res.status(200).send(roomRequests);
        })
        .catch(error => res.status(400).send(error));
    }
    return RoomRequest.findAll({

      /*   where: where, */
      order: [
        [sort, order]
      ],
      include: [{
        model: Booking,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
          model: AvailableTime,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        }, {
          model: UserInfo,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        }, {
          model: MentorProgram,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [{
            model: UserInfo,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          }]
        }],
        attributes: { exclude: ['availableTimeID', 'attendantId', "mentorProgramId"] },
      }],
      attributes: { exclude: ['updatedAt', 'mentorBookingId'] },
    })
      .then(roomRequests => {

        if (!roomRequests) {
          res.append('X-Total-Count', 0);
          return res.status(404).send({
            message: "There are no roomRequest "
          });
        }
        var result = roomRequests.filter((exercise, key) => key >= start && key < end)
        res.append('X-Total-Count', roomRequests.length);

        return res.status(200).send(result);
      })
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    return RoomRequest.create({
      mentorBookingId: req.body.mentorBookingId,
    })
      .then(roomRequests => res.status(201).send(roomRequests))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return RoomRequest.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(roomRequest => {
        if (!roomRequest) {
          return res.status(404).send({
            message: "There are no responding roomRequest "
          });
        }
        return res.status(200).send(roomRequest);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return RoomRequest.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(roomRequest => {
        if (!roomRequest) {
          return res.status(404).send({
            message: "There are no responding roomRequest "
          });
        }
        return roomRequest
          .update({
            roomRequest: req.body.roomRequest,
          })
          .then(roomRequests => res.status(201).send(roomRequests))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return RoomRequest.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(roomRequests => {
        if (!roomRequests) {
          return res.status(404).send({
            message: "RoomRequest  Not Found"
          });
        }
        return roomRequests
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
