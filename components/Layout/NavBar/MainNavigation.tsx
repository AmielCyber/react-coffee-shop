import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Link from "next/link";
// My imports.
import CompanyIcon from "../Icons/CompanyIcon";
import HeaderCartButton from "./HeaderCartButton";
// CSS import.
import styles from "./MainNavigation.module.css";

/**
 * Returns the link's css styled class based on the current page.
 * @param {string} currentPath url in the page.
 * @param {string} linkPath The navigation list item.
 * @param {string} style The default style.
 * @returns string name of the css style for the current path navigation list.
 */
function activeLinkStyle(
  currentPath: string,
  linkPath: string,
  style: string
): string {
  return currentPath === linkPath ? `${style} ${styles.active}` : style;
}

const MainNavigation = () => {
  const { data: session, status } = useSession(); // Check if there is an authenticated session.
  const router = useRouter();
  const currentPath = router.asPath; // To highlight the current navigation link the navbar.

  // Handlers.
  const signOutHandler = useCallback(() => {
    // Signs-out user and removes the session cookie using next-auth. Reloads website and resets initial state settings.
    signOut();
  }, []);
  const signInHandler = useCallback(() => {
    // Redirect user to the login page.
    router.push("/auth");
    // Avoid recreating this function.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li className={activeLinkStyle(currentPath, "/", "")}>
            <Link href={"/"} passHref>
              <a>
                <CompanyIcon width={30} height={30} fill={"white"} />
              </a>
            </Link>
          </li>
          <li className={activeLinkStyle(currentPath, "/menu", styles.menu)}>
            <Link href="/menu">Menu</Link>
          </li>
          {!session && status !== "loading" && (
            <li className={activeLinkStyle(currentPath, "/auth", "")}>
              <Link href="/auth">Sign in</Link>
            </li>
          )}
          {session && (
            <>
              <li className={activeLinkStyle(currentPath, "/account", "")}>
                <Link href="/account">Account</Link>
              </li>
              <li>
                <a onClick={signOutHandler}>Sign out</a>
              </li>
            </>
          )}
          <li>
            <span className={styles.cartButton}>
              <HeaderCartButton onSignIn={signInHandler} />
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
