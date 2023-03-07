import Head from "next/head";
import Image from "next/image";
import { m } from "framer-motion";
// My imports.
import coffeeShopImage from "../assets/coffee-shop.jpg";
import { pageAnimation } from "../utils/animations/animation";
import WelcomeMessage from "../components/Welcome/WelcomeMessage";
// CSS styles.
import styles from "./HomePage.module.css";

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
          quality={80}
          placeholder="blur"
          fill
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
