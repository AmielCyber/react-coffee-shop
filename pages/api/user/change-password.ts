
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { User } from "@prisma/client";
// My imports.
import { passwordIsValid } from "../../../utils/db/input-validation";
import { hashPassword, verifyPassword } from "../../../utils/auth/auth";
import prisma from "../../../utils/db/prisma";

const DEMO_EMAIL = "demo@gmail.com";
// Validate if a request is validated or not
// Protects API routes.
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== "PATCH"){
        res.status(400).json({message: "Invalid call"});
        return;
    }
    // Get current session.
    const session = await getServerSession(req, res, authOptions);

    // Check if client is authenticated
    if(!session){
        res.status(401).json({message: "Not authenticated!"});
        return;
    }

    // Get the user's credential
    const userEmail: string = session.user.email;
    const enteredOldPassword: string = req.body.currentPassword;
    const enteredNewPassword: string = req.body.newPassword;

    // If user is the demo account then do not change password.
    if(userEmail === DEMO_EMAIL){
        // Guard the demo's account password.
        res.status(403).json({
            message: "Demo account can not change password. Please use another account to try out this function."
        })
        return;
    }

    // Validate new password.
    if(!passwordIsValid(enteredNewPassword)){
        res.status(400).json({
            message: "Invalid new password entered. Password must be 7 characters or more."
        })
        return;
    }

    // Get the user's data from our db.
    let user: User | null = null;
    try {
        user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            }
        })
    }catch(error){
        res.status(500).json({
            message: "Failed to connect to the user database!"
        })
        return;
    }

    // Check if user exists
    if(!user){
        res.status(404).json({message: "User not found."})
        return;
    }

    // Validate that entered password matches with the user's password.
    const oldHashedPassword = user.password;
    const passwordEqual = await verifyPassword(enteredOldPassword, oldHashedPassword);

    // User entered invalid password.
    if(!passwordEqual){
        res.status(403).json({message: "Invalid current password entered."});
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
            }
        });
      } catch (error) {
            res.status(500).json({ message: "Server could not change password at the moment. Please try again later." });
            return;
      }

    res.status(200).json({ message: "Password updated!" });
}