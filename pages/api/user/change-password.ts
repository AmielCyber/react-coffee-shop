import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { User } from "@prisma/client";
import { SafeParseReturnType } from "zod";
// My imports.
import validateCredentials from "../../../utils/db/validate-credentials";
import { validatePassword } from "../../../utils/db/input-validation";
import { hashPassword, verifyPassword } from "../../../utils/auth/auth";
import prisma from "../../../utils/db/prisma";

const DEMO_EMAIL = "demo@gmail.com";
// Validate if a request is validated or not
// Protects API routes.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    // Get current session.
    const session = await getServerSession(req, res, authOptions);

    // Check if client is authenticated
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    // Get the user's credential
    const userEmail: string = session.user.email;
    const enteredOldPassword: string = req.body.currentPassword;
    const enteredNewPassword: string = req.body.newPassword;

    // If user is the demo account then do not change password.
    if (userEmail === DEMO_EMAIL) {
      // Guard the demo's account password.
      res.status(423).json({
        message:
          "Demo account can not change password. Please use another account to try out this function.",
      });
      return;
    }

    // Validate new password.
    const passwordValidation: SafeParseReturnType<string, string> =
      validatePassword(enteredNewPassword);
    if (!passwordValidation.success) {
      res.status(400).json({
        message: passwordValidation.error.message,
      });
      return;
    }

    let responseData = null;
    try {
      responseData = await validateCredentials(userEmail, enteredOldPassword);
      if (!responseData) {
        throw new Error();
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to connect to the user database!" });
      return;
    }

    // Invalid credentials.
    if (!responseData.user) {
      res
        .status(responseData.httpCode)
        .json({ message: responseData.errorMessage });
      return;
    }

    // Hashed the newly created password to be stored in our DB.
    const newHashedPassword = await hashPassword(enteredNewPassword);

    // Update the password in our user's DB.
    try {
      await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          password: newHashedPassword,
        },
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server could not change password at the moment. Please try again later.",
      });
      return;
    }
    res.status(200).json({ message: "Password updated!" });
    return;
  } else {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
}
