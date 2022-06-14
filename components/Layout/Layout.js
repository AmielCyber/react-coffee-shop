import React, { Fragment } from 'react';
// My imports.
import MainNavigation from './NavBar/MainNavigation';
// CSS import.
import styles from './Layout.module.css';

// The layout of the react coffee shop web page.
export default function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  );
}
