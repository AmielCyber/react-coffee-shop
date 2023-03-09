// My imports.
import MainNavigation from "./NavBar/MainNavigation";
// CSS import.
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

// The layout of the react coffee shop web page.
export default function Layout(props: LayoutProps) {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>{props.children}</main>
    </>
  );
}
