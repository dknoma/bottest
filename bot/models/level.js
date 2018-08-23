'use strict';
module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define('Level', {
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    realm_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_link: {
     type:  DataTypes.STRING,
     defaultValue: 'No image link was provided.'
    }
  }, {});
  Level.associate = models => {
    Level.hasMany(models.Sublevel, {
      foreignKey: 'levelId',
      as: 'sublevels',
    })
  };
  return Level;
};