import React, { Fragment } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
// My imports.
import CompanyIcon from '../Icons/CompanyIcon';
import HeaderCartButton from './HeaderCartButton';
// CSS import.
import styles from './MainNavigation.module.css';

/**
 * Names the link's css style based on the current page.
 * @param {string} currentPath url in the page.
 * @param {string} linkPath The navigation list item.
 * @param {string} style The default style.
 * @returns string name of the css style for the current path navigaion list.
 */
function activeLinkStyle(currentPath, linkPath, style) {
  return currentPath === linkPath ? `${style} ${styles.active}` : style;
}

export default function MainNavigation(props) {
  const { data: session, status } = useSession();

  const logoutHandler = () => {
    // Logsout user and removing the session cookie using next-auth
    signOut();
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li className={activeLinkStyle(props.currentPath, '/', '')}>
            <Link href={'/'} passHref>
              <a>
                <CompanyIcon width={30} height={30} fill={'#FFF'} />
              </a>
            </Link>
          </li>
          <li className={activeLinkStyle(props.currentPath, '/menu', styles.menu)}>
            <Link href='/menu'>Menu</Link>
          </li>
          {!session && status !== 'loading' && (
            <li className={activeLinkStyle(props.currentPath, '/auth', '')}>
              <span className={styles.seperator}>
                <Link href='/auth'>Login</Link>
              </span>
            </li>
          )}
          {session && (
            <Fragment>
              <li className={activeLinkStyle(props.currentPath, '/account', '')}>
                <Link href='/account'>Account</Link>
              </li>
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            </Fragment>
          )}
          <li>
            <span className={styles.cartButton}>
              <HeaderCartButton
                onSelectCart={props.onSelectCart}
                isInitial={props.isInitial}
                disableInitial={props.disableInitial}
              />
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
