const dbConnect = require("../utilites/dbConnect");

const client = dbConnect();

const bookingCollection = client.db('mediCare').collection('bookings');
async function getAllBooking(patient) {
      const query = { patient: patient };
      const bookings = await bookingCollection.find(query).toArray();
      return bookings
}

async function findOneBooking(query) {
    const filterService = await bookingCollection.findOne(query);
    return filterService;
}

async function insertBooking(booking) {
    const result = await bookingCollection.insertOne(booking);
    return result;
}

module.exports = {getAllBooking, findOneBooking, insertBooking}