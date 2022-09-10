import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { m } from "framer-motion";
// My Imports.
import coffeeShopImage from "../assets/coffee-shop.jpg";
import { pageAnimation } from "../utils/animations/animation";
// CSS styles.
import styles from "./HomePage.module.css";
// My dynamic import.
const WelcomeMessage = dynamic(
  () => import("../components/Welcome/WelcomeMessage")
);

export default function Home() {
  return (
    <>
      <Head>
        <title>React Coffee</title>
        <meta
          name="description"
          content="Welcome to React Coffee order now from our store!"
          title="title"
        />
      </Head>
      <div className={styles.homeImage}>
        <Image
          alt="Coffee Shop Interior"
          title="Image by @pinchebesu from Unsplash"
          src={coffeeShopImage}
          layout="fill"
          objectFit="cover"
          quality={80}
          objectPosition="center"
          placeholder="blur"
        />
      </div>
      <m.div
        className={styles.pageOverlay}
        initial="in"
        animate="animate"
        variants={pageAnimation}
      >
        <WelcomeMessage />
      </m.div>
    </>
  );
}
