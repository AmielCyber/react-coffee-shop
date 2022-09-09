import React, { Fragment } from "react";
// My imports.
import MainNavigation from "./NavBar/MainNavigation";
// CSS import.
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

// The layout of the react coffee shop web page.
const Layout = ({ children }: LayoutProps) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={styles.main}>{children}</main>
    </Fragment>
  );
};

export default Layout;
