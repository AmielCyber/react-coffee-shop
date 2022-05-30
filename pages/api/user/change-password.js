import { getSession } from 'next-auth/react';
import { hashPassword, verifyPassword } from '../../../utils/auth/auth';
import { connectToDatabase } from '../../../utils/db/db-util';

// URI address to connect to the MongoDB client.
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.hsycr.mongodb.net/${process.env.USER_DB}?${process.env.OPTIONS}`;

// Validate if a request is validated or not
// Protects API routes.
export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  /// TRY CATCH
  const client = await connectToDatabase(uri);

  // Get a hold of the database.
  const db = client.db();
  // Get access to the collection.
  const usersCollection = db.collection(process.env.USER_COLLECTION);
  // Find the document with the following filter property.
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordEqual) {
    // Alt 422 -> user input is incorrect.
    res.status(403).json({ message: 'Invalid password.' }); // Authenticated but not authorized.
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } });
  client.close();
  res.status(200).json({ message: 'Password updated!' });
}
