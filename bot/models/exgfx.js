'use strict';
module.exports = (sequelize, DataTypes) => {
  var ExGFX = sequelize.define('ExGFX', {
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    biome_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  ExGFX.associate = function(models) {
    // associations can be defined here
  };
  return ExGFX;
};