'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExGFX = sequelize.define('ExGFX', {
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
      defaultValue: false
    }
  }, {});
  ExGFX.associate = (models) => {
    // associations can be defined here
  };
  return ExGFX;
};