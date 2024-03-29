const express = require('express');
const cors = require('cors');
const serviceRouter = require('./src/routes/service/service.router');
const availableRouter = require('./src/routes/available/available.router');
const bookingRouter = require('./src/routes/booking/booking.router');
const userRouter = require('./src/routes/users/user.router');
const doctorRouter = require('./src/routes/doctors/doctor.router');
const adminRouter = require('./src/routes/admin/admin.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/service', serviceRouter);
app.use('/available', availableRouter);
app.use('/booking', bookingRouter);
app.use('/user', userRouter);
app.use('/doctor', doctorRouter);
app.use('/admin', adminRouter);

app.get("/", (req, res) => {
    res.send("Hello!!");
  });
  

module.exports = app;