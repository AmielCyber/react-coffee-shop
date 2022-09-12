import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// My imports.
import { passwordIsValid } from "../../../utils/db/input-validation";
import { connectToDatabase } from "../../../utils/db/db-util";
import { hashPassword, verifyPassword } from "../../../utils/auth/auth";

const DEMO_EMAIL = "demo@gmail.com";
// Validate if a request is validated or not
// Protects API routes.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    res.status(400).json({ message: "Invalid call" });
    return;
  }

  // Get current session.
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    // Client is not authenticated.
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  // Get the user's credentials.
  const userEmail = session.user.email;
  const oldPassword: string = req.body.currentPassword;
  const newPassword: string = req.body.newPassword;

  // Can not change demo user password.
  if (userEmail === DEMO_EMAIL) {
    // Guard the demo's account password.
    res.status(403).json({
      message:
        "Demo account can not change password. Please use another account to try out this function.",
    });
    return;
  }

  // Backend validation
  if (!passwordIsValid(newPassword)) {
    res.status(400).json({
      message:
        "Invalid new password entered. Password must be 7 characters or more.",
    });
    return;
  }

  // Connect to the user database.
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to connect to the order database!" });
    return;
  }

  // Get a hold of the database.
  const db = client.db();
  // Get access to the collection.
  let usersCollection;
  try {
    usersCollection = db.collection(process.env.USER_COLLECTION);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to connect to the order database!" });
    return;
  }
  // Find the document with the following filter property.
  let user;
  try {
    user = await usersCollection.findOne({ email: userEmail });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to connect to the order database!" });
    return;
  }

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  // Verify the old password is correct.
  const oldHashedPassword = user.password; // Old hashed password from the DB
  const passwordEqual = await verifyPassword(oldPassword, oldHashedPassword);

  if (!passwordEqual) {
    // User did not entered the correct current password.
    res.status(403).json({ message: "Invalid current password entered." }); // Authenticated but not authorized.
    return;
  }

  // Hashed the newly created password to be stored in our DB.
  const newHashedPassword = await hashPassword(newPassword);

  // Update the password in our user DB.
  try {
    await usersCollection.updateOne(
      { email: userEmail },
      { $set: { password: newHashedPassword } }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not changed password in the database." });
    return;
  }
  res.status(200).json({ message: "Password updated!" });
}
