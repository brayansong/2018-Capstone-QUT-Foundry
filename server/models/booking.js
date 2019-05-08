'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    availableTimeID: DataTypes.INTEGER,
    attendantId: DataTypes.INTEGER,
    mentorProgramId: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {});
  Booking.associate = function (models) {
    // associations can be defined here

    Booking.belongsTo(models.AvailableTime, { foreignKey: 'availableTimeID' })
    Booking.belongsTo(models.UserInfo, { foreignKey: 'attendantId', targetKey: "userId" })
    Booking.belongsTo(models.MentorProgram, { foreignKey: 'mentorProgramId' })
  };
  return Booking;
};