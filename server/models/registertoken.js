'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegisterToken = sequelize.define('RegisterToken', {
    email: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  RegisterToken.associate = function(models) {
    // associations can be defined here
  };
  return RegisterToken;
};