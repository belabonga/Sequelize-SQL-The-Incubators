'use strict';
const fs = require('fs');


module.exports = {
  up (queryInterface, Sequelize) {
     const data = JSON.parse(fs.readFileSync("./data/startup.json", "utf-8"))
     data.forEach(x => {
       delete x.id
       x.createdAt = new Date();
       x.updatedAt = new Date()
     });
    return queryInterface.bulkInsert("Startups", data, {})
  },

  down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete("Startups", data, {})
  }
};
