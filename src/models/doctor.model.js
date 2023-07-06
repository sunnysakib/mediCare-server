const dbConnect = require("../utilites/dbConnect");

const client = dbConnect()
const doctorCollection = client.db('mediCare').collection('doctors');
async function getAllDoctor(){
    const doctors = await doctorCollection.find().toArray();
    return doctors;
}

async function insertDoctor(doctor){
    const result = await doctorCollection.insertOne(doctor);
    return result;
}

async function deleteDoctor(email){
    const filter = {email: email};
    const result = await doctorCollection.deleteOne(filter);
    return result;
}

module.exports = {getAllDoctor, insertDoctor,deleteDoctor};