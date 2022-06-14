import React, { useCallback, Fragment } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// My imports.
import CompanyIcon from '../Icons/CompanyIcon';
import HeaderCartButton from './HeaderCartButton';
// CSS import.
import styles from './MainNavigation.module.css';

/**
 * Returns the link's css styled class based on the current page.
 * @param {string} currentPath url in the page.
 * @param {string} linkPath The navigation list item.
 * @param {string} style The default style.
 * @returns string name of the css style for the current path navigaion list.
 */
function activeLinkStyle(currentPath, linkPath, style) {
  return currentPath === linkPath ? `${style} ${styles.active}` : style;
}

export default function MainNavigation() {
  const { data: session, status } = useSession(); // Check if there is an authenticated session.
  const router = useRouter();
  const currentPath = router.asPath; // To highlight the current navigation link the navbar.

  // Handlers.
  const logoutHandler = useCallback(() => {
    // Signsout user and removes the session cookie using next-auth
    // Reloads website to all of its initial state settings.
    signOut();
  }, []);
  const loginHandler = useCallback(() => {
    // Redirect user to the login page.
    router.push('/auth');
    // Avoid recreating this function.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li className={activeLinkStyle(currentPath, '/', '')}>
            <Link href={'/'} passHref>
              <a>
                <CompanyIcon width={30} height={30} fill={'#FFF'} />
              </a>
            </Link>
          </li>
          <li className={activeLinkStyle(currentPath, '/menu', styles.menu)}>
            <Link href='/menu'>Menu</Link>
          </li>
          {!session && status !== 'loading' && (
            <li className={activeLinkStyle(currentPath, '/auth', '')}>
              <span className={styles.seperator}>
                <Link href='/auth'>Login</Link>
              </span>
            </li>
          )}
          {session && (
            <Fragment>
              <li className={activeLinkStyle(currentPath, '/account', '')}>
                <Link href='/account'>Account</Link>
              </li>
              <li>
                <a onClick={logoutHandler}>Logout</a>
              </li>
            </Fragment>
          )}
          <li>
            <span className={styles.cartButton}>
              <HeaderCartButton onLogin={loginHandler} />
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
