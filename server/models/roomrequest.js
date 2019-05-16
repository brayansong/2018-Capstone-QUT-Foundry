'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoomRequest = sequelize.define('RoomRequest', {
    mentorBookingId: DataTypes.INTEGER
  }, {});
  RoomRequest.associate = function (models) {
    // associations can be defined here
    RoomRequest.belongsTo(models.Booking, { foreignKey: 'mentorBookingId' })
  };
  return RoomRequest;
};