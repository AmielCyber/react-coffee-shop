// CSS import.
import styles from "./LoadingSpinner.module.css";

/**
 * Displays a loading spinner when the website is loading data.
 * @returns LoadingSpinner Component
 */
const LoadingSpinner = () => {
  return <div className={styles.spinner}></div>;
};

export default LoadingSpinner;
