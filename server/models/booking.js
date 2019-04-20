'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    availableTimeID: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    room: DataTypes.STRING,
    facultyId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};