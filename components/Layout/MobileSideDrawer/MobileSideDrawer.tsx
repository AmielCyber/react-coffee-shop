import { createPortal } from "react-dom";
import { m } from "framer-motion";
// My imports.
import { sideDrawerAnimation } from "../../../utils/animations/animation";
import styles from "./MobileSideDrawer.module.css";

const OverlayElement = document.querySelector("#drawer-hook") as HTMLElement;

type SideDrawerProps = {
  onClose: () => void;
  children: React.ReactNode;
};
function SideDrawer({ onClose, children }: SideDrawerProps) {
  return createPortal(
    <m.aside
      onClick={onClose}
      className={styles.sideDrawer}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={sideDrawerAnimation.transition}
      variants={sideDrawerAnimation}
    >
      {children}
    </m.aside>,
    OverlayElement
  );
}
export default SideDrawer;
