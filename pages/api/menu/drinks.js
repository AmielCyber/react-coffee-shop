import { connectToDatabase, getAllDocuments } from '../../../utils/db/db-util';

// URI address to connect to the MongoDB client.
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.hsycr.mongodb.net/${process.env.DRINK_DB}?${process.env.OPTIONS}`;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Connect to the database.
    let client;
    try {
      client = await connectToDatabase(uri);
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the menu database failed!' });
      return;
    }
    // Get document.
    let drinks;
    try {
      drinks = await getAllDocuments(client, process.env.DRINK_COLLECTION);
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Fetching menu data failed!' });
      client.close();
      return;
    }
    const drinksListTransformed = [];
    for (const key in drinks) {
      drinksListTransformed.push({
        id: drinks[key]._id.toString(),
        name: drinks[key].name,
        ounces: drinks[key].ounces,
        description: drinks[key].description,
        price: drinks[key].price,
        imgSrc: drinks[key].imgSrc,
      });
    }
    res.status(200).json(drinksListTransformed);
    client.close(); // Remember to always close the connection.
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}
