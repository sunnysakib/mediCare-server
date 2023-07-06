const express = require("express");
const app = require('./app')
const verifyJWT = require('./src/utilites/verifyJWT')
const dbConnect = require('./src/utilites/dbConnect')
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0trawla.mongodb.net/?retryWrites=true&w=majority`

const client = dbConnect()

async function run(){
  try{
      await client.connect().then(()=>{
        console.log("mongoDB connection established");
      });
      const userCollection = client.db('mediCare').collection('users');
      const doctorCollection = client.db('mediCare').collection('doctors');
      

      app.get('/admin/:email', async(req, res) =>{
        const email = req.params.email;
        const user = await userCollection.findOne({email: email});
        const isAdmin = user.role === 'admin';
        res.send({admin: isAdmin})
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


