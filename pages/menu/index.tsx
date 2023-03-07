import Head from "next/head";
import Image from "next/image";
import { m } from "framer-motion";
// My imports.
import drinksImage from "../../assets/coffee-drinks.jpg";
import { pageAnimation } from "../../utils/animations/animation";
// CSS styles.
import styles from "./MenuPage.module.css";
// Components.
import DrinksSummary from "../../components/Drinks/DrinksSummary";
import AvailableDrinks from "../../components/Drinks/AvailableDrinks";

export default function Menu() {
  return (
    <>
      <Head>
        <title>Order Drinks</title>
        <meta
          name="description"
          content="Order React Coffee drinks to go!"
          title="title"
        />
      </Head>
      <div className={styles.menuPageImage}>
        <Image
          src={drinksImage}
          title="Image by @c_reel from Unsplash"
          alt="A table full of coffee drinks"
          quality={80}
          placeholder="blur"
          fill
        />
      </div>
      <m.div
        className={styles.container}
        initial="in"
        animate="animate"
        variants={pageAnimation}
      >
        <DrinksSummary />
      </m.div>
      <AvailableDrinks />
    </>
  );
}
