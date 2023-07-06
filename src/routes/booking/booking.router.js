const verifyJWT = require('../../utilites/verifyJWT');
const {httpGetAllBooking,httpPostBookingService, httpGetBookingById} = require('./booking.controller');

express = require('express');

const bookingRouter = express.Router();

bookingRouter.get('/',verifyJWT, httpGetAllBooking)
bookingRouter.get('/:id',verifyJWT, httpGetBookingById)
bookingRouter.post('/', httpPostBookingService);

module.exports = bookingRouter