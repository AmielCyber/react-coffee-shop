// My imports.
import { connectToDatabase, getAllDocuments } from '../../../utils/db/db-util';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Connect to the database.
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the menu database failed!' });
      return;
    }
    // Get document.
    let drinks;
    try {
      drinks = await getAllDocuments(client, process.env.DRINK_COLLECTION);
    } catch (error) {
      res.status(500).json({ message: 'Fetching menu data failed!' });
      return;
    }
    // Transform the list fetch from our database to an array we will used to display the available drinks.
    const drinksListTransformed = [];
    for (const key in drinks) {
      drinksListTransformed.push({
        id: drinks[key]._id.toString(),
        name: drinks[key].name,
        ounces: drinks[key].ounces,
        description: drinks[key].description,
        price: drinks[key].price,
        imgSrc: drinks[key].imgSrc,
        originalSource: drinks[key].originalSource,
      });
    }
    res.status(200).json(drinksListTransformed);
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}
