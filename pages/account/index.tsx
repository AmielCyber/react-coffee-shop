// Next.js Backend imports.
import { GetServerSideProps } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Image from "next/image";
// Frontend imports
import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import Head from "next/head";
import { m } from "framer-motion";
import type { Session } from "next-auth";
// My imports.
import { pageAnimation } from "../../utils/animations/animation";
import coffeeLove from "../../assets/coffeeLove.jpg";
import Card from "../../components/UI/Card";
// CSS import.
import styles from "./AccountPage.module.css";
// My dynamic import.
const UserProfile = dynamic(
  () => import("../../components/Profile/UserProfile"),
  { ssr: false }
);
const PastOrders = dynamic(
  () => import("../../components/PastOrders/PastOrders"),
  { ssr: false }
);

type AccountPageProps = {
  session: Session;
};
export default function AccountPage({ session }: AccountPageProps) {
  const [showPastOrders, setShowPastOrders] = useState(false);

  const toggleShowPastOrdersHandler = () => {
    setShowPastOrders((prevState) => !prevState);
  };

  return (
    <>
      <Head>
        <title>View your account.</title>
        <meta
          name="description"
          content="Change your password or view your past orders."
          title="title"
        />
      </Head>
      <div className={styles.accountPageImage}>
        <Image
          alt="A coffee cup in a white background and letters spelling LOVE"
          src={coffeeLove}
          title="Image by @inchristalone from Unsplash"
          layout="fill"
          objectFit="cover"
          quality={30}
          objectPosition="center"
          placeholder="blur"
        />
      </div>
      <m.div initial="in" animate="animate" variants={pageAnimation}>
        <Card style="container">
          <Suspense fallback={`Loading User Profile...`}>
            <UserProfile session={session} />
          </Suspense>
        </Card>
        <div
          className={styles.toggleShowOrders}
          onClick={toggleShowPastOrdersHandler}
          role="button"
        >
          <Card style="displayContainer">
            <h2>{showPastOrders ? "Hide Past Orders" : "Show Past Orders"}</h2>
          </Card>
        </div>
        {showPastOrders && (
          <Suspense fallback={`Loading Past Orders...`}>
            <PastOrders />
          </Suspense>
        )}
      </m.div>
    </>
  );
}

// Protect API Route.
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get current session if there is one.
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      props: {
        session,
      },
    };
  }
  // If there is no session prompt user to sign in.
  return {
    redirect: {
      destination: "/auth",
      permanent: false,
    },
  };
};
