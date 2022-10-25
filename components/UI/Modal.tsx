import React from "react";
import { m } from "framer-motion";
// My import.
import {
  modalAnimation,
  modalTransition,
} from "../../utils/animations/animation";
// My import.
import Backdrop from "./Backdrop";
// CSS import.
import styles from "./Modal.module.css";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ onClose, children }: ModalProps) {
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
}

export default Modal;
