const Controller = require('../controllers/controller');
const route = require('express').Router();
const routeIncubators = require('./incubatorsRoute');
const routeStartup = require('./startupsRoute');

route.get('/', Controller.showIncubators)
route.get('/startup', Controller.showStartups)

route.use('/incubators', routeIncubators)
route.use('/incubators', routeStartup)

module.exports = route;