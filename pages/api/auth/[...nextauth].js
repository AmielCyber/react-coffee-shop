import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// My imports.
import { verifyPassword } from '../../../utils/auth/auth';
import { connectToDatabase } from '../../../utils/db/db-util';

// Handles all other auth routes.
export default NextAuth({
  session: {
    strategy: 'jwt', // Use Jason Web Tokens
  },
  providers: [
    CredentialsProvider({
      // Use when loginIn is called.
      async authorize(credentials) {
        let client;
        let usersCollection;
        let user;
        // Connect to the database and fetch credentials.
        try {
          client = await connectToDatabase();
          usersCollection = client.db().collection(process.env.USER_COLLECTION);
          user = await usersCollection.findOne({ email: credentials.email });
        } catch (errror) {
          throw new Error('Failed to connect to the database!');
        }

        if (!user) {
          // No user was found in our database.
          throw new Error('No user found with this email address. Please try again.');
        }

        // Verify user's input credentials.
        let isValid;
        try {
          isValid = await verifyPassword(credentials.password, user.password);
        } catch (error) {
          isValid = false;
        }

        if (!isValid) {
          // User enter invalid credentials.
          throw new Error('Incorrect password. Please try again.');
        }

        // Return user object.
        return {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
