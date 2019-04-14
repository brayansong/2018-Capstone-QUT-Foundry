"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lossPassToken: DataTypes.STRING,

      lastLogin: DataTypes.STRING,
      active: DataTypes.BOOLEAN
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    // User.hasOne(models.UserInfo)
    User.hasMany(models.UserInfo, {
      foreignKey: 'userId',
    });
  };
  return User;
};
