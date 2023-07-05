const dbConnect = require("../utilites/dbConnect");

const client = dbConnect();

async function getAllService(){
    const serviceCollection =  client.db('mediCare').collection('services');
    const query = {};
    const cursor = serviceCollection.find(query).project({ name: 1 });
    const services = await cursor.toArray();
    return  services;
}

module.exports = getAllService