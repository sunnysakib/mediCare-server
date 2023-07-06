const express = require('express');
const verifyJWT = require('../../utilites/verifyJWT');
const { httpGetAllDoctor, httpPostDoctor, httpDeleteDoctor } = require('./doctor.controller');

const doctorRouter = express.Router();

doctorRouter.get('/',verifyJWT, httpGetAllDoctor);
doctorRouter.post('/',verifyJWT, httpPostDoctor);
doctorRouter.delete('/:email',verifyJWT, httpDeleteDoctor);

module.exports = doctorRouter;