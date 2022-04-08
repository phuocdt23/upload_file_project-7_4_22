//import mongodb package
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase(){
  const client = await MongoClient.connect('mongodb://localhost:27017');
  database = client.db('file-demo');
}

function getDb(){
  if(!database) {throw{message: "cannot connect to database!!"}}
  else return database;
}
module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
}

