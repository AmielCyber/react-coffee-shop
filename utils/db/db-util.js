"use strict";
const clientPromise = require("./mongodb-client");

/**
 * Connect to the MongoDB.
 * @returns MongoClient Object
 */
async function connectToDatabase() {
  // Connect to the database.
  const client = await clientPromise; // client promise as recommended from MongoDB
  return client;
}

// Getters.
/**
 * Retrieves one document in a collection from an email user.
 * @param {MongoClient} client
 * @param {string} collectionName in the database to retrieve.
 * @param {string} emailUser to get one unique document.
 * @returns One document if found, else it returns false.
 */
async function getOneDocumentFromUser(client, collectionName, emailUser) {
  // Get access of the collection.
  const collection = client.db().collection(collectionName);
  // Get the document corresponding to that email.
  const document = await collection.findOne({ email: emailUser });

  return document;
}
/**
 * Retrieves all documents in a collection from a user's email.
 * @param {MongoClient} client
 * @param {string} collectionName
 * @param {string} userEmail to get all documents.
 * @returns An array of documents.
 */
async function getAllDocumentsFromEmailUser(client, collectionName, userEmail) {
  // Get access to the collection.
  const collection = client.db().collection(collectionName);
  // Find all the documents in collection and get back an array of documents
  const dataList = await collection.find({ email: userEmail }).toArray();

  return dataList;
}
/**
 * Retrieves all documents in a collection from a user's email.
 * @param {MongoClient} client
 * @param {string} collectionName
 * @param {string} userEmail to get all documents.
 * @param {Object} sortQuery how to sort the array of documents.
 * @returns An array of documents.
 */
async function getAllDocumentsFromEmailUserSorted(
  client,
  collectionName,
  userEmail,
  sortQuery
) {
  // Get access to the collection.
  const collection = client.db().collection(collectionName);
  // Find all the documents in collection and get back an array of documents
  const dataList = await collection
    .find({ email: userEmail })
    .sort(sortQuery)
    .toArray();

  return dataList;
}
/**
 * Retrieves all documents in a collection.
 * @param {MongoClient} client
 * @param {string} collectionName
 * @returns An array of documents.
 */
async function getAllDocuments(client, collectionName) {
  // Get access to the collection.
  const collection = client.db().collection(collectionName);
  // Find all the documents in collection and get back an array of documents
  const dataList = await collection.find().toArray();

  return dataList;
}

// Inserts
/**
 * Inserts a document in the collection.
 * @param {MongoClient} client
 * @param {string} collectionName
 * @param {Object} document to insert in the collection
 * @returns MongoDB status result. { acknowledged:boolean, modifiedCount:Number, upsertedId:Object, upsertedCount:Number, matchedCount:Number}
 */
async function insertADocument(client, collectionName, document) {
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
 * @param {string} userEmail
 * @returns {JSON} document the original document replaced if found, else it returns null.
 */
async function insertAndReplaceDocument(
  client,
  collectionName,
  replacementDocument,
  userEmail
) {
  // Get access to the collection.
  const collection = client.db().collection(collectionName);
  // Finds a document with the matching email if there is one, else it will create one and result will be null.
  const result = await collection.findOneAndReplace(
    { email: userEmail },
    replacementDocument,
    { upsert: true }
  );

  return result;
}
/**
 * Checks if a user exists in our database.
 * @param {string} email
 * @returns boolean: true->user exists false->no user found
 */
async function checkIfUserExists(email) {
  const client = await connectToDatabase();
  const existingUser = await client
    .db()
    .collection(process.env.USER_COLLECTION)
    .findOne({ email: email });

  // Only return boolean value since existing user is falsey or truthy.
  return existingUser !== null;
}

module.exports = {
  connectToDatabase,
  getOneDocumentFromUser,
  getAllDocumentsFromEmailUser,
  getAllDocumentsFromEmailUserSorted,
  getAllDocuments,
  insertADocument,
  insertAndReplaceDocument,
  checkIfUserExists,
};
