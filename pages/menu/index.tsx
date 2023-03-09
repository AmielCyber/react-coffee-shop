import Head from "next/head";
import Image from "next/image";
import { m } from "framer-motion";
// My imports.
import styles from "./MenuPage.module.css";
import drinksImage from "../../public/background/coffee-drinks.jpg";
import { pageAnimation } from "../../utils/animations/animation";
// My Components.
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
          quality={70}
          placeholder="blur"
          blurDataURL="/blur/menuBlur.png"
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
