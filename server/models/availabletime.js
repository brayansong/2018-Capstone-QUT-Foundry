'use strict';
module.exports = (sequelize, DataTypes) => {
  const AvailableTime = sequelize.define('AvailableTime', {
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    title: DataTypes.STRING
  }, {});
  AvailableTime.associate = function(models) {
    // associations can be defined here
  };
  return AvailableTime;
};