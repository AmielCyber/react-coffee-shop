import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// My imports.
import getDrinksFromServer from "utils/db/db-drinks-util";
import type Cart from "../../../models/Cart";
import type Receipt from "../../../models/Receipt";
import { SafeParseReturnType } from "zod";
import prisma from "../../../utils/db/prisma";
import User from "../../../models/User";
import { validateUserData } from "../../../utils/db/input-validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get session if there is one.
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    // req.body Expected: user:{fName, lName, email}, cart:{items, numOfItems, totalPrice}
    const { user, cart }: { user: User; cart: Cart } = req.body;

    // Backend Validation: Validate user input.
    const userValidation: SafeParseReturnType<User, User> =
      validateUserData(user);
    if (!userValidation.success) {
      // If userDataIsValid return a non empty string then an error message occurred.
      res
        .status(422)
        .json({
          message: userValidation.error.issues
            .map((issue) => issue.path + ": " + issue.message)
            .join(" "),
        });
      return;
    }

    // Get the user's data from our db if there's one
    let userDB: User | null = null;
    try {
      userDB = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to connect to the user database!",
      });
      return;
    }

    // If user order as a guest.
    if (!session) {
      // If the user email already exists.
      if (userDB !== null) {
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
          res.status(400).json({ message: "Invalid order quantity entered." });
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

    // Add the order to the database.
    try {
      await prisma.order.create({ data: receipt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Inserting order data failed." });
      return;
    }

    res.status(201).json({ message: "Your order was created!" });
    return;
  } else if (req.method === "GET") {
    if (!session) {
      // Protect our API route. Only authenticated users are allowed to receive past order data.
      res.status(401).json({ message: "User is not logged in." });
      return;
    }
    const email = session.user.email;

    // Get past orders.
    let pastOrders;
    try {
      pastOrders = await prisma.order.findMany({
        orderBy: {
          orderDate: "desc",
        },
        where: {
          email: email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get orders from this user." });
      return;
    }
    res.status(200).json(pastOrders);
  } else {
    res.status(418).json({
      message: "I am a teapot and I refuse to brew coffee with teapot.",
    });
  }
}
