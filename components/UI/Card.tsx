// CSS import.
import styles from "./Card.module.css";

/**
 * Card style to have our Card component reusable.
 * @param {string} cardType
 * @returns styleType css module string
 */
function getCardStyle(cardType: string) {
  let styleType = "";

  switch (cardType) {
    case "container":
      styleType = styles.container;
      break;
    case "slim":
      styleType = styles.slim;
      break;
    case "orderContainer":
      styleType = styles.orderContainer;
      break;
    case "displayContainer":
      styleType = styles.displayContainer;
      break;
    default:
      styleType = styles.card;
  }

  return styleType;
}
type CartProps = {
  style?: string;
  children: React.ReactNode;
};
/**
 * Styles the passed props.children component into a a square with rounded corners.
 * @param {CartProps} props any type of props will be forwarded.
 * @returns React Component.
 */
export default function Card(props: CartProps) {
  const cardStyle = props.style ? props.style : "";
  const styleType = getCardStyle(cardStyle);

  return <div className={styleType}>{props.children}</div>;
}
