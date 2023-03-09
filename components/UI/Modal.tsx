import React from "react";
import { m } from "framer-motion";
// My imports.
import styles from "./Modal.module.css";
import {
  modalAnimation,
  modalTransition,
} from "../../utils/animations/animation";
// My component.
import Backdrop from "./Backdrop";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal(props: ModalProps) {
  return (
    <>
      <Backdrop onClose={props.onClose} />
      <m.div
        className={styles.modal}
        initial="in"
        animate="animate"
        exit="out"
        variants={modalAnimation}
        transition={modalTransition}
      >
        <div className={styles.content}>{props.children}</div>
      </m.div>
    </>
  );
}
