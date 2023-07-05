const express = require('express');
const cors = require('cors');
const serviceRouter = require('./src/routes/service/service.router')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/service', serviceRouter)

module.exports = app;