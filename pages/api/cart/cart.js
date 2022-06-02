// My import.
import { connectToDatabase, insertAndReplaceDocument, getFirstDocument } from '../../../utils/db/db-util';

// URI address to connect to the MongoDB client.
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.hsycr.mongodb.net/${process.env.CART_DB}?${process.env.OPTIONS}`;

export default async function handler(req, res) {
  switch (req.method) {
    // Insert a Cart object to our Cart collection
    case 'POST':
      {
        const cartData = req.body;

        // Connect to the cart database.
        let client;
        try {
          client = await connectToDatabase(uri);
        } catch (error) {
          res.status(500).json({ message: 'Connecting to the cart database failed!' });
          return;
        }

        // Add cart document to the database.
        try {
          await insertAndReplaceDocument(client, process.env.CART_COLLECTION, cartData);
          client.close();
        } catch (error) {
          res.status(500).json({ message: 'Inserting cart data failed!' });
          client.close();
          return;
        }
        res.status(201).json({ message: 'Cart sucessfully updated!' });
      }
      break;
    case 'GET':
      // Get a Cart object from our Cart collection.
      {
        // Connect to the database.
        let client;
        try {
          client = await connectToDatabase(uri);
        } catch (error) {
          res.status(500).json({ message: 'Connecting to the cart database failed!' });
          return;
        }
        // Get document.
        let cart;
        try {
          cart = await getFirstDocument(client, process.env.CART_COLLECTION);
          client.close();
        } catch (error) {
          res.status(500).json({ message: 'Fetching cart data failed!' });
          client.close();
          return;
        }
        res.status(200).json(cart);
      }
      break;
    default:
      res.status(404).json({ message: `I'm a teapot 7_)7` });
  }
}
