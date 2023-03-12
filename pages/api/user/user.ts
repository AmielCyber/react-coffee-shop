import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// My imports.
import prisma from "../../../utils/db/prisma";
import validateCredentials from "../../../utils/db/validate-credentials";

const DEMO_EMAIL = "demo@gmail.com";
// Validate if a request is validated or not
// Protects API routes.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    // Get current session.
    const session = await getServerSession(req, res, authOptions);

    // Check if client is authenticated
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    // Get the user's credential
    const userEmail: string = session.user.email;
    const enteredPassword: string = req.body.password;

    // If user is the demo account then do not delete.
    if (userEmail === DEMO_EMAIL) {
      // Guard the demo's account password.
      res.status(423).json({
        message:
          "Demo account can not be deleted. Please use another account to try out this function.",
      });
      return;
    }

    let responseData = null;
    try {
      responseData = await validateCredentials(userEmail, enteredPassword);
    } catch (error) {
      res.status(500).json({
        message: "Failed to connect to the user database!",
      });
      return;
    }

    // If validation was unsuccessful.
    if (!responseData) {
      res.status(500).json({
        message: "Failed to connect to the user database!",
      });
      return;
    }
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
          email: userEmail,
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
  } else {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
}
