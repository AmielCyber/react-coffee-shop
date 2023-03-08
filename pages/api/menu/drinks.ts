import type { NextApiRequest, NextApiResponse } from "next";
// My import.
import prisma from "../../../utils/db/prisma";
import type Drink from "../../../models/Drink";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Get drinks.
    let drinks;
    try {
      drinks = await prisma.drink.findMany();
    } catch (error) {
      res.status(500).json({ message: "Fetching menu data failed!" });
      return;
    }
    // Transform the list fetch from our database to an array we will used to display the available drinks.
    const drinksListTransformed: Drink[] = drinks.map(drink => {
      return {
        id: drink.id,
        name: drink.name,
        ounces: drink.ounces,
        description: drink.description,
        price: drink.price, 
        imgSrc: drink.imgSrc,
        originalSource: drink.originalSource,
      }
    })
    res.status(200).json(drinksListTransformed);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}
