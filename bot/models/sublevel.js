'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sublevel = sequelize.define('Sublevel', {
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_link: {
      type: DataTypes.STRING,
      defaultValue: 'No image link was provided.'
    }
  }, {});
  Sublevel.associate = models => {
    Sublevel.belongsTo(models.Level, {
      foreignKey: 'levelId',
      onDelete: 'CASCADE',
    })
  };
  return Sublevel;
};