const {getAllUser,putUserEmail, putUserRoleAdmin, findRequesterAccount} = require("../../models/user.model");

async function httpGetAllUser (req, res){
    res.send(await getAllUser());
}

async function httpPutUserEmail (req, res){
    const email = req.params.email;
    const user = req.body;
    res.send(await putUserEmail(email, user));
}

async function httpPutUserRoleAdmin (req, res){
    const email = req.params.email;
    const requester = req.decoded.email;
    const requesterAccount = await findRequesterAccount(requester);
    if (requesterAccount.role === 'admin') {
        return res.status(200).send(await putUserRoleAdmin(email));
      }
      else{
        return res.status(403).send({message: 'forbidden'});
      }

}


module.exports = {httpGetAllUser, httpPutUserEmail, httpPutUserRoleAdmin};