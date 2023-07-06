const dbConnect = require("../utilites/dbConnect");
require("dotenv").config();
const client = dbConnect();
const jwt = require('jsonwebtoken');
const userCollection = client.db('mediCare').collection('users');

async function getAllUser(){
    const users = await userCollection.find().toArray();
    return users;
}

async function putUserEmail(email, user){
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
          $set: user,
    };
    const result = await userCollection.updateOne(filter, updateDoc, options);
    const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET , { expiresIn: '2h' })
    return {result, token};
}

async function putUserRoleAdmin(email){
    const filter = { email: email };
    const updateDoc = {
        $set: { role: 'admin' },
    };
    const result = await userCollection.updateOne(filter, updateDoc);
    return result;
}

async function findRequesterAccount(requester){
    const result = await userCollection.findOne({ email: requester });
    return result;
}


module.exports = {getAllUser,putUserEmail, putUserRoleAdmin, findRequesterAccount};