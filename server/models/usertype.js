'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    type: DataTypes.STRING
  }, {});
  UserType.associate = function(models) {
    // associations can be defined here
  };
  return UserType;
};