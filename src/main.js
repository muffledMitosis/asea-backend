const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const credentials = fs.readFileSync('./test_user.pem');
const client = new MongoClient('mongodb://ac-lktdlyl-shard-00-00.jfxqmip.mongodb.net:27017,ac-lktdlyl-shard-00-01.jfxqmip.mongodb.net:27017,ac-lktdlyl-shard-00-02.jfxqmip.mongodb.net:27017/?ssl=true&replicaSet=atlas-jwszxv-shard-0&authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials
});
async function run() {
  try {
    await client.connect();
    const database = client.db("testDB");
    const collection = database.collection("testCol");
    const docCount = await collection.countDocuments({});
    console.log(docCount);
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);