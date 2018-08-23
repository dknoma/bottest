'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Levels', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    realm_number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    image_link: {
      type: Sequelize.STRING,
      defaultValue: 'No image link was provided.'
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
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Levels'),
};