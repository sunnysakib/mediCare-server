const express = require('express');
const httpGetAvailableService = require('./available.controller');

const availableRouter = express.Router();

availableRouter.get('/', httpGetAvailableService);

module.exports = availableRouter;