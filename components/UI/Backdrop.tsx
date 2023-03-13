import { m } from "framer-motion";
// My imports.
import styles from "./Backdrop.module.css";
import { backdropAnimation } from "utils/animations/animation";
type BackdropProps = {
  onClose: () => void;
};

/**
 * The backdrop that will darken the background when the cart button is selected.
 * @param {props} props.onClose click handler when a user clicks outside the cart or inside the backdrop.
 * @returns React component.
 */
export default function Backdrop(props: BackdropProps) {
  return (
    <m.div
      className={styles.backdrop}
      onClick={props.onClose}
      initial="brighten"
      animate="darken"
      exit="brighten"
      variants={backdropAnimation}
    />
  );
}
