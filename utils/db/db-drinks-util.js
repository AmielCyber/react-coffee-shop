import { connectDataBase, getAllDocuments } from './db-util';

// URI address to connect to the MongoDB client
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.hsycr.mongodb.net/${process.env.DRINK_DB}?${process.env.OPTIONS}`;
// User validation.
const isEmpty = (value) => value.trim() === '';
const isNotEmail = (value) => !value.includes('@');

/**
 * Validates the user's data.
 * @param {user} userData: {firstName:string, lastName:string, email:string}
 * @returns string containing the failed validation or an empty string if the user's data is valid.
 */
export function userDataIsValid(userData) {
  if (!userData) {
    // if the user object does not exists
    return 'No user data';
  }
  if (
    typeof userData.firstName !== 'string' ||
    isEmpty(userData.firstName) ||
    typeof userData.lastName !== 'string' ||
    isEmpty(userData.lastName)
  ) {
    //names are invalid
    return 'Invalid name entered';
  }
  if (typeof userData.email !== 'string' || isEmpty(userData.email) || isNotEmail(userData.email)) {
    // email is invalid
    return 'Invalid email entered';
  }
  // User data has valid inputs therefore an empty error string.
  return '';
}

/**
 *  Gets the drink list from the server with the correct price.
 * @returns drinkData ={drinks(Map):{key-id:string, value-{name:string, price:Number}}}}
 */
export async function getDrinksFromServer() {
  // Drink data we will return.
  const drinkData = {
    drinks: null,
    errorMessage: '',
  };
  // Connect to the drinks database.
  let client;
  try {
    client = await connectDataBase(uri);
  } catch (error) {
    drinkData.errorMessage = 'Connecting to the database failed';
    return drinkData;
  }
  // Get drinks document.
  let drinkList;
  try {
    drinkList = await getAllDocuments(client, process.env.DRINK_COLLECTION);
    client.close();
  } catch (error) {
    drinkData.errorMessage = 'Fetching data failed!';
    client.close();
    return drinkData;
  }
  // Map all the drink items in the document.
  const drinkMap = new Map();
  for (const key in drinkList) {
    drinkMap.set(drinkList[key]._id.toString(), {
      name: drinkList[key].name,
      price: drinkList[key].price,
    });
  }
  client.close(); // Remember to always close the connection.
  drinkData.drinks = drinkMap;
  return drinkData;
}
