import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../utils/auth/auth';
import { connectDataBase } from '../../../utils/db/db-util';

// URI address to connect to the MongoDB client.
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.hsycr.mongodb.net/${process.env.USER_DB}?${process.env.OPTIONS}`;
// Handles all other auth routes.
export default NextAuth({
  session: {
    strategy: 'jwt', // use Jason Web Tokens
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // TRY CATCHES
        const client = await connectDataBase(uri);

        const usersCollection = client.db().collection(process.env.USER_COLLECTION);
        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();
        return {
          email: user.email,
        };
      },
    }),
  ],
});
