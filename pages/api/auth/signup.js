import { connectDataBase } from '../../../utils/db/db-util';
import { hashPassword } from '../../../utils/auth/auth';

// URI address to connect to the MongoDB client.
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.hsycr.mongodb.net/${process.env.USER_DB}?${process.env.OPTIONS}`;
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const { email, password } = data;

    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
      res.status(422).json({ message: 'Invalid input, password should also be 7 characters long.' });
      return;
    }

    // TRY CATCH

    const client = await connectDataBase();

    const db = client.db(uri);

    // Check if user already exists.
    const existingUser = await db.collection(process.env.USER_COLLECTION).findOne({ email: email });

    if (existingUser) {
      // User found therefore exists.
      res.status(422).json({ message: 'User exists already!' });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection(process.env.USER_COLLECTION).insertOne({
      email: email,
      password: hashedPassword, // Do not store plain passwords, must be encrypted.
    });

    res.status(201).json({ message: 'Created user!' });
    client.close();
  }
}
