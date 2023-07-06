const { getAllDoctor, insertDoctor, deleteDoctor } = require("../../models/doctor.model");

async function httpGetAllDoctor (req, res){
    res.send(await getAllDoctor());
}

async function httpPostDoctor (req, res){
    const doctor = req.body;
    res.send(await insertDoctor(doctor));
}

async function httpDeleteDoctor (req, res){
    const email = req.params.email;
    res.send(await deleteDoctor(email));
}

module.exports = {httpGetAllDoctor, httpPostDoctor,httpDeleteDoctor}