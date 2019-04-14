'use strict';
module.exports = (sequelize, DataTypes) => {
  const Faculty = sequelize.define('Faculty', {
    userId: DataTypes.INTEGER,
    faculty: DataTypes.STRING
  }, {});
  Faculty.associate = function(models) {
    // associations can be defined here
  };
  return Faculty;
};