const getAdmin = require("../../models/admin.model");

async function httpGetAdmin (req, res){
    const email = req.params.email;
    res.send(await getAdmin(email));
}



module.exports = {httpGetAdmin}