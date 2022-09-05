const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0trawla.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
  try{
      await client.connect();
      const serviceCollection = client.db('mediCare').collection('services');
      const bookingCollection = client.db('mediCare').collection('bookings');
      app.get('/service', async (req, res) =>{
        const query = {};
        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
      })


      app.get('/available', async(req, res) =>{
        const date = req.query.date;
  
        const services = await serviceCollection.find().toArray();

        const query = {date: date};
        const bookings = await bookingCollection.find(query).toArray();
  
        services.forEach(service=>{
          const serviceBookings = bookings.filter(book => book.treatment === service.name);
          const bookedSlots = serviceBookings.map(book => book.slot);
          const available = service.slots.filter(slot => !bookedSlots.includes(slot));
          service.slots = available;
        });
       
  
        res.send(services);
      })

      app.get('/booking', async(req, res) =>{
        const patient = req.query.patient;
        const query = {patient: patient};
        const bookings = await bookingCollection.find(query).toArray();
        res.send(bookings);
      })
  
      app.post('/booking', async (req, res) => {
        const booking = req.body;
        const query = { treatment: booking.treatment, date: booking.date, patient: booking.patient }
        const exists = await bookingCollection.findOne(query);
        if (exists) {
          return res.send({ success: false, booking: exists })
        }
        const result = await bookingCollection.insertOne(booking);
        return res.send({ success: true, result });
      })
  } finally{

  }
}
run().catch(console.dir)

app.get("/", (req, res) => {
  res.send("Hello!!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


