import type { NextApiRequest, NextApiResponse } from "next";
// My import.
import { connectToDatabase, getAllDocuments } from "../../../utils/db/db-util";
import type Drink from "../../../models/Drink";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Connect to the database.
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Connecting to the menu database failed!" });
      return;
    }
    // Get document.
    let drinks;
    try {
      if (process.env.DRINK_COLLECTION) {
        drinks = await getAllDocuments(client, process.env.DRINK_COLLECTION);
      } else {
        throw new Error(
          "Environment variable for DRINK_COLLECTION not defined"
        );
      }
    } catch (error) {
      res.status(500).json({ message: "Fetching menu data failed!" });
      return;
    }
    // Transform the list fetch from our database to an array we will used to display the available drinks.
    const drinksListTransformed: Drink[] = [];
    for (const key in drinks) {
      const newDrink: Drink = {
        id: drinks[key]._id.toString(),
        name: drinks[key].name,
        ounces: drinks[key].ounces,
        description: drinks[key].description,
        price: drinks[key].price,
        imgSrc: drinks[key].imgSrc,
        originalSource: drinks[key].originalSource,
      };
      drinksListTransformed.push(newDrink);
    }
    res.status(200).json(drinksListTransformed);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}
