"use strict";
const { connectToDatabase, getAllDocuments } = require("./db-util");

/**
 * Gets the drink list from the server with the correct price.
 * Makes sure that we get the data from our server instead of the front-end.
 * @returns drinkData ={drinks(Map):{key-id:string, value-{name:string, price:Number}}}}
 */
async function getDrinksFromServer() {
  // Drink data we will return.
  const drinkData = {
    drinks: new Map(),
    errorMessage: "",
  };
  // Connect to the drinks database.
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    drinkData.errorMessage = "Connecting to the database failed";
    return drinkData;
  }
  // Get drinks document.
  let drinkList;
  try {
    drinkList = await getAllDocuments(client, process.env.DRINK_COLLECTION);
  } catch (error) {
    drinkData.errorMessage = "Fetching data failed!";
    return drinkData;
  }
  // Map all the drink items in the document.
  for (const key in drinkList) {
    drinkData.drinks.set(drinkList[key]._id.toString(), {
      name: drinkList[key].name,
      price: drinkList[key].price,
    });
  }
  return drinkData;
}

module.exports = getDrinksFromServer;
