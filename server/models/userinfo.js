'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInfo = sequelize.define('UserInfo', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    userType: DataTypes.INTEGER,
    qutId: DataTypes.INTEGER,
  }, {});
  UserInfo.associate = function (models) {
    // associations can be defined here
    UserInfo.belongsTo(models.UserType, { foreignKey: 'userType' })
  };
  return UserInfo;
};