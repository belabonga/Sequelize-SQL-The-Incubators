'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Startups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startUpName: {
        type: Sequelize.STRING
      },
      founderName: {
        type: Sequelize.STRING
      },
      dateFound: {
        type: Sequelize.DATE
      },
      educationOfFounder: {
        type: Sequelize.STRING
      },
      roleOfFounder: {
        type: Sequelize.STRING
      },
      IncubatorId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      IncubatorId: {
        type : Sequelize.INTEGER,
		    reference : {
          model : "Startups",
          key : id
		    },
        onUpdate : "cascade",
        onDelete : "cascade"
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Startups');
  }
};