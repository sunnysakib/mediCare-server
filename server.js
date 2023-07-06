const http = require('http');
const app = require('./app')
const dbConnect = require('./src/utilites/dbConnect')

const port = process.env.PORT || 5000;

const client = dbConnect()

const server = http.createServer(app)

async function startServer(){
  try{
      await client.connect().then(()=>{
        console.log("mongoDB connection established");
      });
  } catch(err){
    console.error(err);
  }
  
  server.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

startServer().catch(console.dir)





