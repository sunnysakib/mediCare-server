const getAllService = require("../../models/service.model");

async function httpGetAllService(req, res){
    return await res.send(await getAllService());
  }

module.exports = {
    httpGetAllService
};