import { useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
// My imports.
import styles from "./MainNavigation.module.css";
// My components.
import Backdrop from "../../UI/Backdrop";
import NavigationLinks from "./NavigationLinks";
import MainHeader from "./MainHeader";
import HeaderCartButton from "./HeaderCartButton";
import SideDrawerButton from "../MobileSideDrawer/SideDrawerButton";
const MobileSideDrawer = dynamic(
  () => import("../MobileSideDrawer/MobileSideDrawer"),
  { ssr: false }
);

export default function MainNavigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  const { status } = useSession(); // Check if user is an authenticated user or a guest user.
  const router = useRouter();
  const currentPath = router.asPath; // To highlight the current navigation link the navbar.

  // Handlers.
  const openDrawerHandler = useCallback(() => {
    setDrawerIsOpen(true);
  }, []);
  const closeDrawerHandler = useCallback(() => {
    setDrawerIsOpen(false);
  }, []);
  const signOutHandler = useCallback(() => {
    // Signs-out user and removes the session cookie using next-auth. Reloads website and resets initial state settings.
    signOut();
  }, []);
  const signInHandler = useCallback(() => {
    // Redirect user to the login page.
    router.push("/auth");
  }, [router]);

  return (
    <>
      <MainHeader>
        <nav className={styles.mainNavigation}>
          <NavigationLinks
            authStatus={status}
            currentPath={currentPath}
            onSignOut={signOutHandler}
          />
        </nav>
        <span className={styles.cartButton}>
          <HeaderCartButton onSignIn={signInHandler} />
        </span>
        <span className={styles.sideBarButton}>
          <SideDrawerButton onOpenDrawer={openDrawerHandler} />
        </span>
      </MainHeader>
      <AnimatePresence>
        {drawerIsOpen && (
          <>
            <Backdrop onClose={closeDrawerHandler} />
            <MobileSideDrawer onClose={closeDrawerHandler}>
              <nav className={styles.mobileNavigation}>
                <NavigationLinks
                  authStatus={status}
                  currentPath={currentPath}
                  onSignOut={signOutHandler}
                />
              </nav>
            </MobileSideDrawer>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
