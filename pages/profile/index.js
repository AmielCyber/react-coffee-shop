import React from 'react';
import { getSession } from 'next-auth/react';
// My import.
import UserProfile from '../../components/Profile/UserProfile';

// TO DO:
// Hello _user
// Add past orders.

export default function ProfilePage(props) {
  return <UserProfile session={props.session} />;
}

// Protect API Route.
export async function getServerSideProps(context) {
  // Get current sesssion if there is one.
  const session = await getSession({ req: context.req });

  if (!session) {
    // If there is no session prompt user to sign in.
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
