import { getSession } from 'next-auth/react';
// My imports.
import {
  connectToDatabase,
  getAllDocumentsFromEmailUser,
  checkIfUserExists,
  insertADocument,
} from '../../../utils/db/db-util';
import { getDrinksFromServer } from '../../../utils/db/db-drinks-util';
import { userDataIsValid } from '../../../utils/db/input-validation';

export default async function handler(req, res) {
  // Get session if there is one.
  const session = await getSession({ req });
  console.log('session ORDER', session);
  if (req.method === 'POST') {
    // req.body Expected: user:{fName, lName, email}, cart:{items, numOfItems, totalPrice}
    const { user, cart } = req.body;
    // Backend Validation: Validate user input.
    const invalidUserMessage = userDataIsValid(user);
    if (invalidUserMessage !== '') {
      res.status(422).json({ message: invalidUserMessage });
      return;
    }

    if (session === null) {
      // If user order as Guest then validate that the email entered is not from an existing user.
      let userExists = true;
      try {
        userExists = await checkIfUserExists(user.email);
      } catch (error) {
        res.status(500).json({ message: 'Could not connect to the database.' });
      }
      if (userExists) {
        // User found, therefore an account already exists.
        res.status(401).json({ message: 'Guest user already has an account. Please sign in.' });
        return;
      }
    } else {
      // Make sure the email is from the user's session.
      user.email = session.user.email;
    }

    // Get available drink list from the server.
    // drink: Map(key- id:string, value- {name:string, price:Number}), errorMessage: string
    const { drinks, errorMessage } = await getDrinksFromServer();
    if (errorMessage !== '') {
      // Connecting to the server failed.
      res.status(422).json({ message: errorMessage });
      return;
    }

    // Reciept Object.
    const reciept = {
      name: user.firstName + user.lastName,
      email: user.email,
      items: [],
      totalItems: 0,
      totalPrice: 0,
      orderDate: null,
    };

    // Check if each item in the list from the cart is valid.
    const items = cart.items;
    for (const item of items) {
      if (drinks.has(item.id)) {
        // If the item exists.
        if (item.amount < 1) {
          // Amount was modified below 1, hence return.
          res.status(400).json({ message: 'Invalid order quantity entered.' });
          return;
        }
        // Enter the item purchased info.
        const drinkItem = drinks.get(item.id);
        reciept.items.push({
          name: drinkItem.name,
          price: drinkItem.price,
          quantity: item.amount,
        });
        reciept.totalItems += item.amount;
        reciept.totalPrice += item.amount * drinkItem.price;
      } else {
        // Invalid cart item was found or out of stock.
        res.status(400).json({ message: `Invalid cart item entered in order ${item.id}` });
      }
    }
    // Create date ordered.
    reciept.orderDate = new Date().toISOString();

    // Connect to the order database.
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Failed to connect to the order database.' });
      return;
    }

    // Add the order to the database.
    try {
      await insertADocument(client, process.env.ORDER_COLLECTION, reciept);
    } catch (error) {
      res.status(500).json({ message: 'Inserting order data failed.' });
      return;
    }
    res.status(201).json({ message: 'Your order was created!' });
  } else if (req.method === 'GET') {
    if (!session) {
      // Protect our API route. Only authenticated users are allowed to recieve past order data.
      res.status(401).json({ message: 'User not logged in.' });
      return;
    }
    const email = session.email;

    // Connect to the database
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the order database failed!' });
      return;
    }
    // Get the document.
    let pastOrders;
    try {
      pastOrders = await getAllDocumentsFromEmailUser(client, process.env.ORDER_COLLECTION, email);
    } catch (error) {
      res.status(500).json({ message: 'Fetching order data failed.' });
      return;
    }
    res.status(200).json(pastOrders);
  } else {
    res.status(418).json({ message: 'I am a teapot and I refuse to brew coffee with teapot.' });
  }
}
