import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
// My imports.
import HeaderCartButton from './HeaderCartButton';
import CompanyIcon from '../Icons/CompanyIcon';
// CSS import.
import styles from './MainNavigation.module.css';

/**
 * Names the link's css style based on the current page.
 * @param {string} currentPath url in the page.
 * @param {string} linkPath The navigation list item.
 * @returns string name of the css style for the current path navigaion list.
 */
function activeLinkStyle(currentPath, linkPath) {
  return currentPath === linkPath ? styles.active : '';
}

export default function MainNavigation(props) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li className={activeLinkStyle(props.currentPath, '/')}>
            <Link href={'/'} passHref>
              <a className={styles.icon}>
                <CompanyIcon width={30} height={30} fill={'#FFF'} />
              </a>
            </Link>
          </li>
          <li className={activeLinkStyle(props.currentPath, '/menu')}>
            <Link href='/menu'>Menu</Link>
          </li>
        </ul>
      </nav>
      <span className={styles.cartButton}>
        <HeaderCartButton
          onSelectCart={props.onSelectCart}
          isInitial={props.isInitial}
          disableInitial={props.disableInitial}
        />
      </span>
    </header>
  );
}
