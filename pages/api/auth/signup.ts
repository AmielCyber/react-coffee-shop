import type { NextApiRequest, NextApiResponse } from "next";
// My imports.
import type RegisteredUser from "../../../models/RegisteredUser";
import { SafeParseReturnType } from "zod";
import { validateRegisteredUserData } from "../../../utils/db/input-validation";
import { hashPassword } from "../../../utils/auth/auth";
import prisma from "../../../utils/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userInfo: RegisteredUser = req.body;

    // Backend Validation: Validate user input.
    const registeredUserValidation: SafeParseReturnType<
      RegisteredUser,
      RegisteredUser
    > = validateRegisteredUserData(userInfo);
    if (!registeredUserValidation.success) {
      res.status(422).json({
        message: registeredUserValidation.error.issues
          .map((issue) => issue.path + ": " + issue.message)
          .join(" "),
      });
      return;
    }

    // Check if user already exists.
    const userExists = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });
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
    try {
      await prisma.user.create({
        data: {
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          password: hashedPassword, // DO NOT STORE PLAIN PASSWORDS in database, must be encrypted.
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to create new user." });
      return;
    }
    res.status(201).json({ message: `Created new user: ${userInfo.email}` });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}
