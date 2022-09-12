// Next.js Backend imports.
import { GetServerSideProps } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Image from "next/image";
// Frontend imports
import dynamic from "next/dynamic";
import type { Session } from "next-auth";
import React, { useState } from "react";
import { m } from "framer-motion";
// My imports.
import { pageAnimation } from "../../utils/animations/animation";
import coffeeLove from "../../assets/coffeeLove.jpg";
import Card from "../../components/UI/Card";
import UserProfile from "../../components/Profile/UserProfile";
// CSS import.
import styles from "./AccountPage.module.css";
// My dynamic import.
const PastOrders = dynamic(
  () => import("../../components/PastOrders/PastOrders")
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
          <UserProfile session={session} />
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
        {showPastOrders && <PastOrders />}
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

  if (!session) {
    // If there is no session prompt user to sign in.
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
