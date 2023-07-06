const express = require('express');
const cors = require('cors');
const serviceRouter = require('./src/routes/service/service.router');
const availableRouter = require('./src/routes/available/available.router');
const bookingRouter = require('./src/routes/booking/booking.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/service', serviceRouter);
app.use('/available', availableRouter);
app.use('/booking', bookingRouter)

module.exports = app;