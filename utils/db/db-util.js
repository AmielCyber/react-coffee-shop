import { MongoClient } from 'mongodb';

// Helper functions to simplyfiy the connection to MongoDB and simply error handling when this functions are called.
const usersURI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.hsycr.mongodb.net/${process.env.USER_DB}?${process.env.OPTIONS}`;

/**
 * Connect to the MongoDB.
 * @param {string} uri
 * @returns MongoDB client
 */
export async function connectToDatabase(uri) {
  // Connect to the database.
  const client = await MongoClient.connect(uri);
  return client;
}
/**
 * Inserts and replaces the first document in the collection.
 * @param {string} client
 * @param {string} collectionName
 * @param {Document} document
 * @returns MongoDB status result. { acknowledged:boolean, modifiedCount:Number, upsertedId:Object, upsertedCount:Number, matchedCount:Number}
 */
export async function insertAndReplaceDocument(client, collectionName, document) {
  // Get a hold of the database.
  const db = client.db();
  // Get access to the collection.
  const collection = db.collection(collectionName);
  // Replace first document({}).
  const result = await collection.replaceOne({}, document, { upsert: true });
  return result;
}
/**
 * Inserts a document in the collection.
 * @param {string} client
 * @param {string} collectionName
 * @param {Document} document
 * @returns MongoDB status result. { acknowledged:boolean, modifiedCount:Number, upsertedId:Object, upsertedCount:Number, matchedCount:Number}
 */
export async function insertADocument(client, collectionName, document) {
  // Get a hold of the database.
  const db = client.db();
  // Get access to the collection.
  const collection = db.collection(collectionName);
  // Insert the document
  const result = await collection.insertOne(document);
  return result;
}
/**
 * Fetches the first document in the collection.
 * @param {MongoDB Client} client
 * @param {string} collectionName
 * @returns Document requested.
 */
export async function getFirstDocument(client, collectionName) {
  // Get a hold of the database.
  const db = client.db();
  // Get access of the collection.
  const collection = db.collection(collectionName);
  // Get the first document.
  const document = await collection.findOne();
  return document;
}
/**
 * Retrieves all documents in a collection.
 * @param {MongoDB Client} client
 * @param {string} collectionName
 * @returns An array of documents.
 */
export async function getAllDocuments(client, collectionName) {
  // Get a hold of the database.
  const db = client.db();
  // Get access to the collection.
  const collection = db.collection(collectionName);
  // Find all the documents in collection and get back an array of documents
  const dataList = await collection.find().toArray();

  return dataList;
}

/**
 * Retrieves all documents in a collection.
 * @param {MongoDB Client} client
 * @param {string} collectionName
 * @returns An array of documents.
 */
export async function getAllDocumentsFromEmailUser(client, collectionName, email) {
  // Get a hold of the database.
  const db = client.db();
  // Get access to the collection.
  const collection = db.collection(collectionName);
  // Find all the documents in collection and get back an array of documents
  const dataList = await collection.find({ email: email }).toArray();

  return dataList;
}

/**
 * Checks if a user exists in our database.
 * @param {string} email
 * @returns boolean: true->user exists false->no user found
 */
export async function checkIfUserExists(email) {
  const client = await connectToDatabase(usersURI);
  const db = client.db();
  const existingUser = await db.collection(process.env.USER_COLLECTION).findOne({ email: email });
  client.close();

  // Only return boolean value since existing user is falsey or truthy.
  return existingUser !== null;
}
