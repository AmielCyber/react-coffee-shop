import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
// My import.
import { modalAnimation } from '../../utils/animations/animation';
// CSS import.
import styles from './Modal.module.css';

/**
 * The backdrop that will darken the background when the cart button is selected.
 * @param {props} props.onClose click handler when a user clicks outside the cart or inside the backdrop.
 * @returns React component.
 */
function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.onClose} />;
}

export default function Modal(props) {
  return (
    <Fragment>
      <Backdrop onClose={props.onClose} />
      <motion.div
        className={styles.modal}
        initial='in'
        animate='animate'
        exit='out'
        variants={modalAnimation}
        transition={modalAnimation.transition}
      >
        <div className={styles.content}>{props.children}</div>
      </motion.div>
    </Fragment>
  );
}
