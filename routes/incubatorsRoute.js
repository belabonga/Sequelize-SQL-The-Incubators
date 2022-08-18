const Controller = require('../controllers/controller');
const route = require('express').Router();

// READ Incubator
route.get('/', Controller.showIncubators);

// CREATE Incubator
route.get('/add', Controller.addIncubatorPage);
route.post('/add', Controller.addIncubator);

// READ Incubator
route.get('/:incubatorId', Controller.incubatorDetail);

module.exports = route