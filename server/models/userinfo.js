'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInfo = sequelize.define('UserInfo', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  UserInfo.associate = function(models) {
    // associations can be defined here
  };
  return UserInfo;
};