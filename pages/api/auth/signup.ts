import type { NextApiRequest, NextApiResponse } from "next";
// My imports.
import type RegisteredUser from "../../../models/RegisteredUser";
import {
  connectToDatabase,
  checkIfUserExists,
} from "../../../utils/db/db-util";
import { userDataIsValid } from "../../../utils/db/input-validation";
import { hashPassword } from "../../../utils/auth/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userInfo: RegisteredUser = req.body;

    // Backend Validation: Validate user input.
    const invalidUserMessage = userDataIsValid(userInfo);
    if (invalidUserMessage !== "") {
      // Validate user name and email.
      res.status(422).json({ message: invalidUserMessage });
      return;
    }
    if (!userInfo.password || userInfo.password.trim().length < 7) {
      // Validate user password.
      res.status(422).json({
        message:
          "Invalid password entered. Password must be at least 7 characters long.",
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
        .json({ message: "Connecting to the cart database failed!" });
      return;
    }
    const db = client.db();

    // Check if user already exists.
    const userExists = await checkIfUserExists(userInfo.email);
    if (userExists) {
      // User found therefore an account already exists.
      res.status(401).json({
        message: "You already have an account. Click below to sign in.",
      });
      return;
    }

    // Hash the user's password to store in our server.
    const hashedPassword = await hashPassword(userInfo.password);

    // Add the new user and its credentials to our database.
    const result = await db.collection(process.env.USER_COLLECTION).insertOne({
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      password: hashedPassword, // DO NOT STORE PLAIN PASSWORDS in database, must be encrypted.
    });

    if (!result.acknowledged) {
      res.status(500).json({ message: "Failed to create new user." });
      return;
    }

    res.status(201).json({ message: "Created new user!" });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}
