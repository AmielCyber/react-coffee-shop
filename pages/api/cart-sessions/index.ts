import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
// My imports.
import type Cart from "../../../models/Cart";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../utils/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Requests will only go to authenticated users.
  const session = await getServerSession(req, res, authOptions);
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
        // Get the cart session
        let cartSession: Cart | null;
        try {
          cartSession = await prisma.cartSession.findUnique({
            where: {
              email: email,
            },
          });
        } catch (error) {
          res.status(500).json({ message: "Fetching cart data failed!" });
          return;
        }
        res.status(200).json(cartSession);
      }
      break;
    case "POST":
      // Insert a Cart object to our Cart collection
      {
        const cartData: Cart = req.body;
        // Update the new cart data.
        try {
          await prisma.cartSession.upsert({
            where: {
              email: email,
            },
            update: {
              items: cartData.items,
              numberOfCartItems: cartData.numberOfCartItems,
              totalPrice: cartData.totalPrice,
            },
            create: {
              email: email,
              items: cartData.items,
              numberOfCartItems: cartData.numberOfCartItems,
              totalPrice: cartData.totalPrice,
            },
          });
        } catch (error) {
          res.status(500).json({ message: "Inserting cart data failed!" });
          return;
        }
        res.status(201).json({ message: "Cart updated!" });
      }
      break;
    default:
      res.status(404).json({ message: `I'm a teapot 7_)7` });
  }
}
