// My imports.
import { connectToDatabase } from '../../../utils/db/db-util';
import { hashPassword } from '../../../utils/auth/auth';

// URI address to connect to the MongoDB client.
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.hsycr.mongodb.net/${process.env.USER_DB}?${process.env.OPTIONS}`;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const { email, password, firstName, lastName } = data; // Get the user input.

    // Verify user input.
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email entered.' });
      return;
    }
    if (!password || password.trim().length < 7) {
      res.status(422).json({ message: 'Invalid password entered. Password must be at least 7 characters long.' });
      return;
    }

    // Connect to the user database.
    let client;
    try {
      client = await connectToDatabase(uri);
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the cart database failed!' });
      return;
    }
    const db = client.db();

    // Check if user already exists.
    const existingUser = await db.collection(process.env.USER_COLLECTION).findOne({ email: email });
    if (existingUser) {
      // User found therefore an account already exists.
      res.status(422).json({ message: 'You already have an account. Click below to sign in.' });
      client.close();
      return;
    }

    // Hash the user's password to store in our server.
    const hashedPassword = await hashPassword(password);

    // Add the new user and its credentials to our database.
    const result = await db.collection(process.env.USER_COLLECTION).insertOne({
      email: email,
      password: hashedPassword, // Do not store plain passwords, must be encrypted.
      firstName: firstName,
      lastName: lastName,
    });

    if (!result.acknowledged) {
      res.status(500).json({ message: 'Failed to create new user.' });
      client.close();
      return;
    }

    res.status(201).json({ message: 'Created user!' });
    client.close();
  }
}
