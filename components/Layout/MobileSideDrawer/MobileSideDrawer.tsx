import { createPortal } from "react-dom";
import { m } from "framer-motion";
// My imports.
import styles from "./MobileSideDrawer.module.css";
import { sideDrawerAnimation } from "../../../utils/animations/animation";

const OverlayElement = document.querySelector("#drawer-hook") as HTMLElement;

type SideDrawerProps = {
  onClose: () => void;
  children: React.ReactNode;
};
export default function SideDrawer(props: SideDrawerProps) {
  return createPortal(
    <m.aside
      onClick={props.onClose}
      className={styles.sideDrawer}
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={sideDrawerAnimation}
    >
      {props.children}
    </m.aside>,
    OverlayElement
  );
}
