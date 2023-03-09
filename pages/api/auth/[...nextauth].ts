import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// My imports.
import { verifyPassword } from "../../../utils/auth/auth";
import prisma from "../../../utils/db/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        let user;
        // Connect to the database and fetch credentials.
        try {
          user = await prisma.user.findUnique({
            where: {
              email: email
            }
          });
        } catch (error) {
          throw new Error("Failed to connect to the database!");
        }

        if (!user) {
          // No user was found in our database.
          throw new Error(
            "No user found with this email address. Please try again."
          );
        }

        // Verify user's input credentials.
        let isValid;
        try {
          isValid = await verifyPassword(password, user.password);
        } catch (error) {
          isValid = false;
        }

        if (!isValid) {
          // User enter invalid credentials.
          throw new Error("Incorrect password. Please try again.");
        }

        // Return user object.
        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: null,
        };
      },
    }),
  ],
  callbacks: {
    session({ session }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Handles all other auth routes.
export default NextAuth(authOptions);
