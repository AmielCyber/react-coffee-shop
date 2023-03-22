import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// My imports.
import prisma from "../../../utils/db/prisma";
import validateCredentials from "../../../utils/db/validate-credentials";
import {
  validateRequestId,
  validatePassword,
} from "../../../utils/db/input-validation";
import { SafeParseReturnType } from "zod";
import { hashPassword } from "../../../utils/auth/auth";

const DEMO_EMAIL = "demo@gmail.com";
// Validate if a request is validated or not
// Protects API routes.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  if (!userId || userId instanceof Array) {
    console.log(userId);
    res.status(400).json({ message: "Invalid arguments" });
    return;
  }
  const validateResponse: SafeParseReturnType<string, string> =
    validateRequestId(userId);
  if (!validateResponse.success) {
    res.status(400).json({
      message: validateResponse.error.message,
    });
    return;
  }

  if (req.method === "DELETE") {
    // Get current session.
    const session = await getServerSession(req, res, authOptions);

    // Check if client is authenticated
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    // Get the user's credential
    const dbUserId: string = session.user.id;
    const userEmail: string = session.user.email;
    const enteredPassword: string = req.body.password;

    // Invalid userId passed as args
    if (userId !== dbUserId) {
      res.status(400).json({
        message: "Request id does not match session id.",
      });
      return;
    }

    // If user is the demo account then do not delete.
    if (userEmail === DEMO_EMAIL) {
      // Guard the demo's account password.
      res.status(423).json({
        message:
          "Demo account can not be deleted. Please use another account to try out this function.",
      });
      return;
    }

    // Get user db document and validate credentials.
    let responseData = null;
    try {
      responseData = await validateCredentials(userEmail, enteredPassword);
      if (!responseData) {
        throw new Error();
      }
    } catch (error) {
      res.status(500).json({
        message: responseData
          ? responseData.errorMessage
          : "Failed to connect to the user database!",
      });
      return;
    }

    // Invalid credentials entered.
    if (!responseData.user) {
      res
        .status(responseData.httpCode)
        .json({ message: responseData.errorMessage });
      return;
    }

    // Update the password in our user's DB.
    try {
      await prisma.user.delete({
        where: {
          id: dbUserId,
        },
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server could not delete the user the moment. Please try again later.",
      });
      return;
    }

    // Successful deletion.
    res.status(200).json({ message: `User: ${userEmail} has been deleted.` });
    return;
  } else if (req.method === "PATCH") {
    // Get current session.
    const session = await getServerSession(req, res, authOptions);

    // Check if client is authenticated
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    // Get the user's credential
    const dbUserId: string = session.user.id;
    const userEmail: string = session.user.email;
    const enteredOldPassword: string = req.body.currentPassword;
    const enteredNewPassword: string = req.body.newPassword;

    // Invalid userId passed as args
    if (userId !== dbUserId) {
      res.status(400).json({
        message: "Request id does not match session id.",
      });
      return;
    }

    // Attempt to modify demo account.
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

    // Validate the user's credentials.
    let responseData = null;
    try {
      responseData = await validateCredentials(userEmail, enteredOldPassword);
      if (!responseData) {
        throw new Error();
      }
    } catch (error) {
      res.status(500).json({
        message: responseData
          ? responseData.errorMessage
          : "Failed to connect to the user database!",
      });
      return;
    }

    // Invalid credentials entered.
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
          id: dbUserId,
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
    // Successful password update.
    res.status(200).json({ message: "Password updated!" });
    return;
  } else {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
}
