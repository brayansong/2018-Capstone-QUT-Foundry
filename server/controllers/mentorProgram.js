const MentorProgram = require("../models").MentorProgram;
const User = require("../models").User;
const UserInfo = require("../models").UserInfo;
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
    var userId = req.query.self !== undefined ? [req.user.id] : [0, 999999999999999999999999999999];
    return MentorProgram.findAll({

      where: {
        mentorId: {
          [Op.between]: userId,
        },
        programName: {
          [Op.iLike]: '%' + filter + '%'
          //[Op.iLike]: { [Op.any]: ['%' + filter + '%', '%' + filter1 + '%'] }
        }
      },
      include: [{
        model: UserInfo,
        attributes: { exclude: ['createdAt', 'updatedAt'] },

      }],
      order: [
        [sort, order]
      ],

    })
      .then(mentorPrograms => {
        if (!mentorPrograms) {
          res.append('X-Total-Count', 0);
          return res.status(404).send({
            message: "There are no mentorProgram"
          });
        }
        var result = mentorPrograms.filter((mentorProgram, key) => key >= start && key < end)
        res.append('X-Total-Count', mentorPrograms.length);

        return res.status(200).send(result);
      })
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return MentorProgram.create({
      programName: req.body.programName,
      mentorId: req.body.mentorId,
      description: req.body.description,
      category: req.body.category,
    })
      .then(mentorPrograms => res.status(201).send(mentorPrograms))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    var filter = req.query.q != undefined ? req.query.q.split("").join('%') : '';
    var userId = req.query.self !== undefined ? [req.user.id] : [0, 999999999999999999999999999999];
    return MentorProgram.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: UserInfo,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }],

    })
      .then(mentorProgram => {
        if (!mentorProgram) {
          return res.status(404).send({
            message: "There are no responding mentorProgram"
          });
        }
        return res.status(200).send(mentorProgram);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return MentorProgram.findOne({
      where: {
        mentorId: req.user.id,
        id: req.params.id
      }
    })
      .then(mentorProgram => {
        if (!mentorProgram) {
          return res.status(404).send({
            message: "There are no responding mentorProgram"
          });
        }
        return mentorProgram
          .update({
            programName: req.body.programName,
            mentorId: req.body.mentorId,
            description: req.body.description,
            category: req.body.category,
          })
          .then(mentorPrograms => res.status(201).send(mentorPrograms))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return MentorProgram.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(mentorPrograms => {
        if (!mentorPrograms) {
          return res.status(404).send({
            message: "MentorProgram Not Found"
          });
        }
        return mentorPrograms
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
