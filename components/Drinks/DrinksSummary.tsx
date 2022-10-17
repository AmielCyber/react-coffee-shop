import { memo } from "react";
// CSS import.
import styles from "./DrinksSummary.module.css";

function DrinksSummary() {
  return (
    <section className={styles.summary}>
      <h2>Order drinks to go!</h2>
      <p>Skip the line</p>
      <p>
        Our espresso drinks are made by our awesome baristas using high quality
        coffee beans.
      </p>
    </section>
  );
}
export default memo(DrinksSummary);
