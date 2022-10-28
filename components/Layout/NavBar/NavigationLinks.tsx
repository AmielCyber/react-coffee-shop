import Link from "next/link";
// My imports.
import CompanyIcon from "../Icons/CompanyIcon";
import styles from "./NavigationLinks.module.css";

/**
 * Returns the link's css styled class based on the current page.
 * @param {string} currentPath url in the page.
 * @param {string} linkPath The navigation list item.
 * @param {string} style The default style.
 * @returns string name of the css style for the current path navigation list.
 */

function getLinkStyle(currentPath: string, linkPath: string): string {
  return currentPath === linkPath ? styles.active : "";
}

type UserLinksProps = {
  authStatus: string;
  currentPath: string;
  onSignOut: () => void;
};
function UserLinks({ authStatus, currentPath, onSignOut }: UserLinksProps) {
  if (authStatus === "authenticated") {
    // Displays Account and Sign Out in NavBar
    return (
      <>
        <li className={getLinkStyle(currentPath, "/account")}>
          <Link href="/account">Account</Link>
        </li>
        <li>
          <a onClick={onSignOut}>Sign out</a>
        </li>
      </>
    );
  } else if (authStatus === "unauthenticated") {
    // Displays Sign In in NavBar
    return (
      <li className={getLinkStyle(currentPath, "/auth")}>
        <Link href="/auth">Sign in</Link>
      </li>
    );
  }
  // Displays Loading in NavBar
  return <li className={styles.loading}>Loading...</li>;
}

type NavigationLinksProps = UserLinksProps;

function NavigationLinks({
  authStatus,
  currentPath,
  onSignOut,
}: NavigationLinksProps) {
  return (
    <ul className={styles.pathList}>
      <li className={getLinkStyle(currentPath, "/")}>
        <Link href={"/"} passHref>
          <a aria-label="Home">
            <CompanyIcon width={30} height={30} fill={"white"} />
          </a>
        </Link>
      </li>
      <li className={getLinkStyle(currentPath, "/menu")}>
        <Link href="/menu">Menu</Link>
      </li>
      <UserLinks
        authStatus={authStatus}
        currentPath={currentPath}
        onSignOut={onSignOut}
      />
    </ul>
  );
}
export default NavigationLinks;
