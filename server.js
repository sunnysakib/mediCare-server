const app = require('./app')
const verifyJWT = require('./src/utilites/verifyJWT')
const dbConnect = require('./src/utilites/dbConnect')

const port = process.env.PORT || 5000;

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
  
  } catch(err){
    console.error(err);
  }
}
run().catch(console.dir)

app.get("/", (req, res) => {
  res.send("Hello!!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


