const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const client = require('./utilites/client')
const { ObjectId } = require("mongodb");
const verifyJWT = require("./utilites/verifyJWT");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function run(){
  try{
      await client.connect();
      const serviceCollection = client.db('mediCare').collection('services');
      const bookingCollection = client.db('mediCare').collection('bookings');
      const userCollection = client.db('mediCare').collection('users');
      const doctorCollection = client.db('mediCare').collection('doctors');
        //server for serv
      app.get('/service', async (req, res) =>{
        const query = {};
        const cursor = serviceCollection.find(query).project({ name: 1 });
        const services = await cursor.toArray();
        res.send(services);
      })

      app.get('/user', verifyJWT, async (req, res) => {
        const users = await userCollection.find().toArray();
        res.send(users);
      });

      app.get('/admin/:email', async(req, res) =>{
        const email = req.params.email;
        const user = await userCollection.findOne({email: email});
        const isAdmin = user.role === 'admin';
        res.send({admin: isAdmin})
      })
  

      app.put('/user/admin/:email', verifyJWT, async (req, res) => {
        const email = req.params.email;
        const requester = req.decoded.email;
        const requesterAccount = await userCollection.findOne({ email: requester });
        if (requesterAccount.role === 'admin') {
          const filter = { email: email };
          const updateDoc = {
            $set: { role: 'admin' },
          };
          const result = await userCollection.updateOne(filter, updateDoc);
          res.send(result);
        }
        else{
          res.status(403).send({message: 'forbidden'});
        }
  
      })

      app.put('/user/:email', async (req, res) => {
        const email = req.params.email;
        const user = req.body;
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
          $set: user,
        };
        const result = await userCollection.updateOne(filter, updateDoc, options);
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET , { expiresIn: '1h' })
        res.send({ result, token});
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

      app.get('/booking',verifyJWT, async(req, res) =>{
        const patient = req.query.patient;
        const decodedEmail = req.decoded.email;
        if (patient === decodedEmail) {
          const query = { patient: patient };
          const bookings = await bookingCollection.find(query).toArray();
          return res.send(bookings);
        }
        else {
          return res.status(403).send({ message: 'forbidden access' });
        }
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


      app.get('/booking/:id', verifyJWT, async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const booking = await bookingCollection.findOne(query);
        res.send(booking);
      })

      app.get('/doctor',verifyJWT, async(req, res) =>{
        const doctors = await doctorCollection.find().toArray();
        res.send(doctors);
      })
  
      app.post('/doctor', verifyJWT, async (req, res) => {
        const doctor = req.body;
        const result = await doctorCollection.insertOne(doctor);
        res.send(result);
      });

      app.delete('/doctor/:email', verifyJWT, async (req, res) => {
        const email = req.params.email;
        const filter = {email: email};
        const result = await doctorCollection.deleteOne(filter);
        res.send(result);
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


