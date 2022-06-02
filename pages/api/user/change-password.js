import { getSession } from 'next-auth/react';
// My imports.
import { passwordIsValid } from '../../../utils/db/input-validation';
import { hashPassword, verifyPassword } from '../../../utils/auth/auth';
import { connectToDatabase } from '../../../utils/db/db-util';

// URI address to connect to the MongoDB client.
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.hsycr.mongodb.net/${process.env.USER_DB}?${process.env.OPTIONS}`;

// Validate if a request is validated or not
// Protects API routes.
export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    res.status(400).json({ message: 'Invalid call' });
    return;
  }

  // Get current session.
  const session = await getSession({ req: req });

  if (!session) {
    // Client is not authenticated.
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  // Get the user's credentials.
  const userEmail = session.user.email;
  const oldPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  // Backend validation
  if (!passwordIsValid(newPassword)) {
    res.status(400).json({ message: 'Invalid new password entered. Password must be 7 characters or more.' });
  }

  // Connect to the user database.
  let client;
  try {
    client = await connectToDatabase(uri);
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect to the order database!' });
    return;
  }

  // Get a hold of the database.
  const db = client.db();
  // Get access to the collection.
  let usersCollection;
  try {
    usersCollection = db.collection(process.env.USER_COLLECTION);
  } catch (error) {
    client.close();
    res.status(500).json({ message: 'Failed to connect to the order database!' });
    return;
  }
  // Find the document with the following filter property.
  let user;
  try {
    user = await usersCollection.findOne({ email: userEmail });
  } catch (error) {
    client.close();
    res.status(500).json({ message: 'Failed to connect to the order database!' });
  }

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  // Verify the old password is correct.
  const oldHashedPassword = user.password; // Old hashed password from the DB
  const passwordEqual = await verifyPassword(oldPassword, oldHashedPassword);

  if (!passwordEqual) {
    // User did not entered the correct current password.
    res.status(403).json({ message: 'Invalid current password entered.' }); // Authenticated but not authorized.
    client.close();
    return;
  }

  // Hashed the newly created password to be stored in our DB.
  const newHashedPassword = await hashPassword(newPassword);

  // Update the password in our user DB.
  try {
    await usersCollection.updateOne({ email: userEmail }, { $set: { password: newHashedPassword } });
  } catch (error) {
    res.status(500).json({ message: 'Could not changed password in the database.' });
  }
  client.close();
  res.status(200).json({ message: 'Password updated!' });
  console.log('yay');
}
