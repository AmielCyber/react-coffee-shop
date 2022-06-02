import React from 'react';
// CSS import.
import styles from './Card.module.css';

function getCardStyle(cardType) {
  let styleType = '';

  switch (cardType) {
    case 'container':
      styleType = styles.container;
      break;
    case 'slim':
      styleType = styles.slim;
      break;
    default:
      styleType = styles.card;
  }

  return styleType;
}
/**
 * Styles the passed props.children component into a a square with rounded corners.
 * @param {any} props any type of props will be forwarded.
 * @returns React Component.
 */
export default function Card(props) {
  const style = props.style ? props.style : '';
  let styleType = getCardStyle(style);
  return <div className={styleType}>{props.children}</div>;
}
