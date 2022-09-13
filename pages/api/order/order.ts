import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// My imports.
import type User from "../../../models/User";
import type Cart from "../../../models/Cart";
import type Receipt from "../../../models/Receipt";
import { userDataIsValid } from "../../../utils/db/input-validation";
import {
  checkIfUserExists,
  connectToDatabase,
  getAllDocumentsFromEmailUserSorted,
  insertADocument,
} from "../../../utils/db/db-util";
import getDrinksFromServer from "../../../utils/db/db-drinks-util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get session if there is one.
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case "POST":
      {
        // req.body Expected: user:{fName, lName, email}, cart:{items, numOfItems, totalPrice}
        const { user, cart }: { user: User; cart: Cart } = req.body;

        // Backend Validation: Validate user input.
        const invalidUserMessage = userDataIsValid(user);
        if (invalidUserMessage !== "") {
          // If userDataIsValid return a non empty string then an error message occurred.
          res.status(422).json({ message: invalidUserMessage });
          return;
        }

        if (session === null) {
          // If user order as Guest
          let userExists = true;
          try {
            // Check if the email entered is not from an existing user.
            userExists = await checkIfUserExists(user.email);
          } catch (error) {
            res
              .status(500)
              .json({ message: "Could not connect to the database." });
            return;
          }
          if (userExists) {
            // User found, therefore an account already exists.
            res.status(401).json({
              message: "Guest user already has an account. Please sign in.",
            });
            return;
          }
        } else {
          // Make sure the email is from the user's session.
          user.email = session.user.email;
        }

        // Verify Cart items.
        // Get available drink list from the server to verify each drink in the cart.
        const {
          drinks,
          errorMessage,
        }: {
          drinks: Map<string, { name: string; price: number }>;
          errorMessage: string;
        } = await getDrinksFromServer();

        if (errorMessage !== "") {
          // Connecting to the server failed.
          res.status(422).json({ message: errorMessage });
          return;
        }

        if (drinks === null) {
          // Connecting to the server failed.
          res.status(422).json({ message: errorMessage });
          return;
        }

        // Create Receipt Object.
        const receipt: Receipt = {
          name: user.firstName + user.lastName,
          email: user.email,
          items: [],
          totalItems: 0,
          totalPrice: 0,
          orderDate: new Date(),
        };

        // Check if each item in the list from the cart is valid.
        const items = cart.items;
        for (const item of items) {
          if (drinks.has(item.id)) {
            // If the item exists.
            if (item.amount < 1) {
              // Amount was modified below 1 in the front-end, thus we stop.
              res
                .status(400)
                .json({ message: "Invalid order quantity entered." });
              return;
            }
            // Enter the item purchased info.
            const drinkItem = drinks.get(item.id);
            if (drinkItem) {
              receipt.items.push({
                id: item.id,
                name: drinkItem.name,
                price: drinkItem.price,
                amount: item.amount,
              });
              receipt.totalItems += item.amount;
              receipt.totalPrice += item.amount * drinkItem.price;
            }
          } else {
            // Invalid cart item was found or out of stock.
            res.status(400).json({
              message: `Invalid cart item entered for item# ${item.id}`,
            });
            return;
          }
        }
        // Update date ordered.
        receipt.orderDate = new Date();

        // Connect to the order database.
        let client;
        try {
          client = await connectToDatabase();
        } catch (error) {
          res
            .status(500)
            .json({ message: "Failed to connect to the order database." });
          return;
        }

        // Add the order to the database.
        try {
          if (process.env.ORDER_COLLECTION === undefined) {
            console.error(
              "Process environment for Order Collection not set/found!"
            );
            throw new Error("Server Error!");
          }
          await insertADocument(client, process.env.ORDER_COLLECTION, receipt);
        } catch (error) {
          res.status(500).json({ message: "Inserting order data failed." });
          return;
        }
        res.status(201).json({ message: "Your order was created!" });
      }
      break;
    case "GET":
      {
        if (!session) {
          // Protect our API route. Only authenticated users are allowed to receive past order data.
          res.status(401).json({ message: "User is not logged in." });
          return;
        }
        const email = session.user.email;

        // Connect to the database
        let client;
        try {
          client = await connectToDatabase();
        } catch (error) {
          res
            .status(500)
            .json({ message: "Connecting to the order database failed!" });
          return;
        }
        // Get the document.
        let pastOrders;
        try {
          if (process.env.ORDER_COLLECTION === undefined) {
            console.error("Process environment for Order Collection not set!");
            throw new Error("Server Error!");
          }
          // Get previous orders by descending date.
          const sortQuery = { orderDate: -1 };
          pastOrders = await getAllDocumentsFromEmailUserSorted(
            client,
            process.env.ORDER_COLLECTION,
            email,
            sortQuery
          );
        } catch (error) {
          res.status(500).json({ message: "Fetching order data failed." });
          return;
        }
        res.status(200).json(pastOrders);
      }
      break;
    default:
      res.status(418).json({
        message: "I am a teapot and I refuse to brew coffee with teapot.",
      });
  }
}
