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
      type: Sequelize.STRING,
      allowNull: false
    },
    main_level: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image_link: {
      type: Sequelize.STRING,
      defaultValue: 'No image link was provided.'
    },
    levelId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Levels',
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