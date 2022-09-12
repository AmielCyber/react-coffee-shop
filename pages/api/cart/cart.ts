import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
// My imports.
import type Cart from "../../../models/Cart";
import { authOptions } from "../auth/[...nextauth]";
import {
  connectToDatabase,
  getOneDocumentFromUser,
  insertAndReplaceDocument,
} from "../../../utils/db/db-util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Requests will only go to authenticated users.
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    // User is not authenticated.
    res.status(401).json({ message: "User is not logged in!" });
    return;
  }
  const email = session.user.email;

  switch (req.method) {
    case "GET":
      // Get a Cart object from our Cart collection.
      {
        // Connect to the database.
        let client;
        try {
          client = await connectToDatabase();
        } catch (error) {
          res
            .status(500)
            .json({ message: "Connecting to the cart database failed!" });
          return;
        }
        // Get document.
        let cart: Cart;
        try {
          if (process.env.CART_COLLECTION === undefined) {
            console.error(
              "Process environment for Cart Collection not set/found!"
            );
            throw new Error("Server Error!");
          }
          cart = await getOneDocumentFromUser(
            client,
            process.env.CART_COLLECTION,
            email
          );
        } catch (error) {
          res.status(500).json({ message: "Fetching cart data failed!" });
          return;
        }
        res.status(200).json(cart);
      }
      break;
    case "POST":
      // Insert a Cart object to our Cart collection
      {
        const cartData = req.body;
        // Add the user email to the cart data
        cartData.email = email;

        // Connect to the cart database.
        let client;
        try {
          client = await connectToDatabase();
        } catch (error) {
          res
            .status(500)
            .json({ message: "Connecting to the cart database failed!" });
          return;
        }

        // Add cart document to the database.
        try {
          if (process.env.CART_COLLECTION === undefined) {
            console.error(
              "Process environment for Cart Collection not set/found!"
            );
            throw new Error("Server Error!");
          }
          await insertAndReplaceDocument(
            client,
            process.env.CART_COLLECTION,
            cartData,
            email
          );
        } catch (error) {
          res.status(500).json({ message: "Inserting cart data failed!" });
          return;
        }
        res.status(201).json({ message: "Cart successfully updated!" });
      }
      break;
    default:
      res.status(404).json({ message: `I'm a teapot 7_)7` });
  }
}
