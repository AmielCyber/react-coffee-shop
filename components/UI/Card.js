import React from 'react';
// CSS import.
import styles from './Card.module.css';

/**
 * Styles the passed props.children component into a a square with rounded corners.
 * @param {any} props any type of props will be forwarded.
 * @returns React Component.
 */
export default function Card(props) {
  return <div className={styles.card}>{props.children}</div>;
}
