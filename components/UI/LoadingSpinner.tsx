// CSS import.
import styles from "./LoadingSpinner.module.css";

/**
 * Displays a loading spinner when the website is loading data.
 * @returns LoadingSpinner Component
 */
export default function LoadingSpinner() {
  return <div role={"status"} className={styles.spinner}></div>;
}
