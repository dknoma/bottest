'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ExGFXes', {
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
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    biome_type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    finished: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('ExGFXes');
  }
};