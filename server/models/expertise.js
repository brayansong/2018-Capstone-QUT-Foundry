'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expertise = sequelize.define('Expertise', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  Expertise.associate = function (models) {
    // associations can be defined here
  };
  return Expertise;
};