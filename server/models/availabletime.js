'use strict';
module.exports = (sequelize, DataTypes) => {
  const AvailableTime = sequelize.define('AvailableTime', {
    userId: DataTypes.INTEGER,
    time: DataTypes.DATE
  }, {});
  AvailableTime.associate = function(models) {
    // associations can be defined here
  };
  return AvailableTime;
};