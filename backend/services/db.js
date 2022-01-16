const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';

const dbName = 'to-do-db';
const client = new MongoClient((url), { useUnifiedTopology: true });

var _db;

function main(callback) {
  // Use connect method to connect to the server
  client.connect(function (err) {
    console.log('Connected successfully to server');
    _db = client.db(dbName);
    callback(err)
  });
}

const findDocuments = async() => {
  const collection = _db.collection('to-do-collection');

  try {
    const findResults = await collection.find({}).toArray();
    return findResults;
  } catch (error) {
    throw new Error(error);
  }
}

const insertDocuments = async(document) => {
  const collection = _db.collection('to-do-collection');

  try {
    const insertResult = await collection.insertOne(document);
    return insertResult;
  } catch (error) {
    throw new Error(error);
  }
}

const updateDocuments = async(document) => {
  const collection = _db.collection('to-do-collection');

  try {
    const updateResult = await collection.updateOne({ _id: document._id }, { $set: document });
    return updateResult;
  } catch (error) {
    throw new Error(error);
  }
}

const removeDocuments = async(document) => {
  const collection = _db.collection('to-do-collection');

  try {
    const deleteResult = await collection.deleteOne({ _id: document._id });
    return deleteResult;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  main,
  findDocuments,
  insertDocuments,
  updateDocuments,
  removeDocuments
}


