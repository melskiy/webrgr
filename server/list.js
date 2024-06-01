const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://cfif5665:OMJ9CaMHV6wa2fKR@cluster0.d8cqo4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db('products');

    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    console.log('Список коллекций:', collectionNames);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
