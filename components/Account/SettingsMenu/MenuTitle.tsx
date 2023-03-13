// My import.
import styles from "./MenuTitle.module.css";

type AccountTitleProps = {
  title: string;
};

export default function AccountTitle(props: AccountTitleProps) {
  return <h2 className={styles.accountTitle}>{props.title}</h2>;
}
