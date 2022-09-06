import * as database from './db/db.js';

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';


const {client, db} = await database.connect();
const ProductsColl = db.collection("Products");
const docCount = await ProductsColl.countDocuments({});
console.log(docCount);

const app = express();

// user body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow cross origin requests from the frontend
app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', (req, res)=>{
  res.send('lol');
});

app.post('/add-product', async (req, res)=>{
  await ProductsColl.insertOne(req.body);
  console.log(req.body);
  res.send(":)");
});

// app.get('/get-from-sku/:sku', async (req, res)=>{
//   let sku = Buffer.from(req.params.sku, "base64").toString('utf8');
//   console.log(sku);
// });

app.get('/products', async (req, res)=>{
  let prods = [];
  const cursor = ProductsColl.find();
  await cursor.forEach(doc => prods.push(doc));
  console.log(prods);
  res.send(prods);
})

app.listen(8080, ()=>{
  console.log('server up');
})

// await client.close();


