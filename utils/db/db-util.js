const clientPromise = require('./mongodb-client');

/**
 * Connect to the MongoDB.
 * @returns MongoClient Object
 */
export async function connectToDatabase() {
  // const client promise as recommended from MongoDB
  // Connect to the database.
  const client = await clientPromise;
  return client;
}

// Getters.
/**
 * Fetches the first document in the collection.
 * @param {MongoClient} client
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
 * Retrieves one document in a collection from an email user.
 * @param {MongoClient} client
 * @param {string} collectionName in the database to retrieve.
 * @param {string} email to get one unique document.
 * @returns One document if found else it returns false.
 */
export async function getOneDocumentFromUser(client, collectionName, email) {
  // Get access of the collection.
  const collection = client.db().collection(collectionName);
  // Get the document corresponding to that email.
  const document = await collection.findOne({ email: email });

  return document;
}
/**
 * Retrieves all documents in a collection.
 * @param {MongoClient} client
 * @param {string} collectionName
 * @param {string} email to get all documents.
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
 * Retrieves all documents in a collection.
 * @param {MongoClient} client
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

// Inserts
/**
 * Inserts and replaces the first document in the collection.
 * @param {MongoClient} client
 * @param {string} collectionName
 * @param {JSON} document
 * @returns MongoDB status result. { acknowledged:boolean, modifiedCount:Number, upsertedId:Object, upsertedCount:Number, matchedCount:Number}
 */
export async function insertAndReplaceDocumentFirstDocument(client, collectionName, document) {
  // Get access to the collection.
  const collection = client.db().collection(collectionName);
  // Replace first document({}).
  const result = await collection.replaceOne({}, document, { upsert: true });
  return result;
}
/**
 * Inserts a document in the collection.
 * @param {MongoClient} client
 * @param {string} collectionName
 * @param {JSON} document
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
 * Inserts and replaces document by email in the passed collection name.
 * If no email is found, then the document is just inserted to the collection.
 * @param {MongoClient} client
 * @param {string} collectionName
 * @param {JSON} replacementDocument
 * @param {string} email
 * @returns {JSON} document the original document replaced if found, else it returns null.
 */
export async function insertAndReplaceDocument(client, collectionName, replacementDocument, email) {
  // Get access to the collection.
  const collection = client.db().collection(collectionName);
  // Finds a document with the matching email if there is one, else it will create one and result will be null.
  const result = await collection.findOneAndReplace({ email: email }, replacementDocument, { upsert: true });
  return result;
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
