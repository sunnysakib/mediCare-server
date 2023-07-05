const getAvailableService = require("../../models/available.model");

async function httpGetAvailableService (req, res){
    const date = req.query.date;
    res.status(200).send(await getAvailableService(date));
}

module.exports = httpGetAvailableService