// My import.
import styles from "./MainHeader.module.css";

type MainHeaderProps = {
  children: React.ReactNode;
};
export default function MainHeader(props: MainHeaderProps) {
  return <header className={styles.mainHeader}>{props.children}</header>;
}
