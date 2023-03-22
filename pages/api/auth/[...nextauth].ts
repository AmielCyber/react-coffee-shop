import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// My imports.
import validateCredentials from "../../../utils/db/validate-credentials";

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

        // Get user db document and validate credentials.
        let responseData = null;
        try {
          responseData = await validateCredentials(email, password);
          if (!responseData) {
            throw new Error();
          }
        } catch (error) {
          throw new Error(
            responseData
              ? responseData.errorMessage
              : "Failed to connect to the database!"
          );
        }

        // No user was found in our database.
        if (!responseData.user) {
          throw new Error(responseData.errorMessage);
        }

        // Return user object.
        return {
          id: responseData.user.id,
          email: responseData.user.email,
          name: `${responseData.user.firstName} ${responseData.user.lastName}`,
          image: null,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Handles all other auth routes.
export default NextAuth(authOptions);
