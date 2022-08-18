const Controller = require('../controllers/controller');
const route = require('express').Router();

// READ Startup
route.get('/:incubatorId/startUp/', Controller.showStartups);

// CREATE Startup
route.get('/:incubatorId/startUp/add', Controller.addStartupPage);
route.post('/:incubatorId/startUp/add', Controller.addStartup);

// UPDATE Startup
route.get('/:incubatorId/startUp/:startUpId/edit', Controller.editStartupPage);
route.post('/:incubatorId/startUp/:startUpId/edit', Controller.editStartUp);

// DELETE
route.get('/:incubatorId/startUp/:startUpId/delete', Controller.deleteStartup);

module.exports = route