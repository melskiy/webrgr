const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 4000;

app.listen(port, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ port) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 

const uri = "mongodb+srv://cfif5665:OMJ9CaMHV6wa2fKR@cluster0.d8cqo4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();
db = client.db('products');

app.use(express.json());


app.get('/collection/:collectionName', async (req, res) => {
    try {
      const collectionName = req.params.collectionName;
      const products = await db.collection(collectionName).find().toArray();
      if (products.length > 0) {
        res.json(products);
      } else {
        res.status(404).send('Коллекция не найдена или в ней нет продуктов');
      }
    } catch (error) {
      res.status(500).send('Ошибка сервера');
    }
  });
