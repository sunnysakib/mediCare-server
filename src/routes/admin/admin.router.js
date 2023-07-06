const express = require('express');
const { httpGetAdmin } = require('./admin.controller');

const adminRouter = express.Router();

adminRouter.get('/:email', httpGetAdmin);


module.exports = adminRouter;