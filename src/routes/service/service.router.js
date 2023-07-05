const express = require('express');
const {httpGetAllService} = require('./service.controller')

const serviceRouter = express.Router();

serviceRouter.get('/', httpGetAllService);

module.exports = serviceRouter;