const { ObjectId } = require("mongodb");
const { getAllBooking, findOneBooking, insertBooking } = require("../../models/booking.model");


async function httpGetAllBooking(req, res){
    const patient = req.query.patient;
    const decodedEmail = req.decoded.email;
    if (patient === decodedEmail) {
        return res.status(200).send(await getAllBooking(patient))
    }else{
        return res.status(403).send({ message: 'forbidden access' });
    } 
  }

  async function httpGetBookingById (req, res) {
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const booking = await findOneBooking(query);
    res.status(200).send(booking);
  }

  async function httpPostBookingService(req, res){
    const booking = req.body;
    const query = { treatment: booking.treatment, date: booking.date, patient: booking.patient }
    
    const exists = await findOneBooking(query)
    if (exists) {
      return res.send({ success: false, booking: exists })
    }

    const result = await insertBooking(booking)
    return res.status(200).send({ success: true, result});
  }
  
module.exports = {httpGetAllBooking, httpPostBookingService, httpGetBookingById}