const dbConnect = require("../utilites/dbConnect");

const client = dbConnect();
const userCollection = client.db('mediCare').collection('users');
async function getAdmin(email){
        const user = await userCollection.findOne({email: email});
        const isAdmin = user.role === 'admin';
        return {admin: isAdmin}
}

module.exports = getAdmin