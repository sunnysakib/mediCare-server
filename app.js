const express = require('express');
const cors = require('cors');
const serviceRouter = require('./src/routes/service/service.router');
const availableRouter = require('./src/routes/available/available.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/service', serviceRouter)
app.use('/available', availableRouter)

module.exports = app;