'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn("Startups", "valuation", Sequelize.INTEGER)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Startups", "valuation", Sequelize.INTEGER)
  }
};
