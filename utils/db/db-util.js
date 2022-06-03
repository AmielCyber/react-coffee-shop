const clientPromise = require('./mongodb-client');

/**
 * Connect to the MongoDB.
 * @returns MongoDB client
 */
export async function connectToDatabase() {
  // const client promise as recommended from MongoDB
  // Connect to the database.
  const client = await clientPromise;
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
  // Get access to the collection.
  const collection = client.db().collection(collectionName);
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
  // Get access to the collection.
  const collection = client.db().collection(collectionName);
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
  // Get access of the collection.
  const collection = client.db().collection(collectionName);
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
  // Get access to the collection.
  const collection = client.db().collection(collectionName);
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
  // Get access to the collection.
  const collection = client.db().collection(collectionName);
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
  const client = await connectToDatabase();
  const existingUser = await client.db().collection(process.env.USER_COLLECTION).findOne({ email: email });

  // Only return boolean value since existing user is falsey or truthy.
  return existingUser !== null;
}
