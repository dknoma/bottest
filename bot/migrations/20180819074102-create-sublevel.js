'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sublevels', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    number: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    image_link: {
      type: Sequelize.STRING,
      defaultValue: 'No image link was provided.'
    },
    levelId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Level',
        key: 'id',
        as: 'levelId'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Sublevels'),
};