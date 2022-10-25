import styles from "./Backdrop.module.css";
type BackdropProps = {
  onClose: () => void;
};

/**
 * The backdrop that will darken the background when the cart button is selected.
 * @param {props} props.onClose click handler when a user clicks outside the cart or inside the backdrop.
 * @returns React component.
 */
function Backdrop({ onClose }: BackdropProps) {
  return <div className={styles.backdrop} onClick={onClose} />;
}
export default Backdrop;
