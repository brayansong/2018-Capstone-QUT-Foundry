'use strict';
module.exports = (sequelize, DataTypes) => {
  const MentorProgram = sequelize.define('MentorProgram', {
    programName: DataTypes.STRING,
    mentorId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    category: DataTypes.STRING
  }, {});
  MentorProgram.associate = function (models) {
    // associations can be defined here

    /*     MentorProgram.hasMany(models.UserInfo, {
          foreignKey: 'mentorId',
        }); */
    MentorProgram.belongsTo(models.UserInfo, { foreignKey: 'mentorId', targetKey: "userId" })

  };
  return MentorProgram;
};