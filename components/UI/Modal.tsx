import React from "react";
import { m } from "framer-motion";
// My import.
import {
  modalAnimation,
  modalTransition,
} from "../../utils/animations/animation";
// CSS import.
import styles from "./Modal.module.css";

type BackdropProps = {
  onClose: () => void;
};

/**
 * The backdrop that will darken the background when the cart button is selected.
 * @param {props} props.onClose click handler when a user clicks outside the cart or inside the backdrop.
 * @returns React component.
 */
const Backdrop = ({ onClose }: BackdropProps) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <m.div
        className={styles.modal}
        initial="in"
        animate="animate"
        exit="out"
        variants={modalAnimation}
        transition={modalTransition}
      >
        <div className={styles.content}>{children}</div>
      </m.div>
    </>
  );
};

export default Modal;
