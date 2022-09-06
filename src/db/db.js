import { MongoClient, ServerApiVersion } from "mongodb";

const credentials = "./test_user.pem";
const client = new MongoClient('mongodb://ac-lktdlyl-shard-00-00.jfxqmip.mongodb.net:27017,ac-lktdlyl-shard-00-01.jfxqmip.mongodb.net:27017,ac-lktdlyl-shard-00-02.jfxqmip.mongodb.net:27017/?ssl=true&replicaSet=atlas-jwszxv-shard-0&authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials
});

export async function connect(){
	await client.connect();
	const db = client.db("WebStore");

	return {client, db};
}