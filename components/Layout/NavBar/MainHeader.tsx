import styles from "./MainHeader.module.css";
type MainHeaderProps = {
  children: React.ReactNode;
};
function MainHeader({ children }: MainHeaderProps) {
  return <header className={styles.mainHeader}>{children}</header>;
}

export default MainHeader;
