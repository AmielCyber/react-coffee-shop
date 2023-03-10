import type { Session } from "next-auth";
import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import { m } from "framer-motion";
// My imports.
import styles from "./AccountMenu.module.css";
import { pageAnimation } from "../../utils/animations/animation";
// My components.
import Card from "../UI/Card";
import SettingsMenu from "./SettingsMenu/SettingsMenu";
import LoadingSpinner from "components/UI/LoadingSpinner";
const PastOrders = dynamic(() => import("../PastOrders/PastOrders"), {
  ssr: false,
});

type UserProfileProps = {
  session: Session;
};

export default function UserProfile(props: UserProfileProps) {
  const [viewSettings, setViewSettings] = useState(false);
  const [showPastOrders, setShowPastOrders] = useState(false);
  const user = props.session.user;

  const toggleShowPastOrdersHandler = () => {
    setShowPastOrders((prevState) => !prevState);
  };

  const goToProfileMenuHandler = () => {
    setViewSettings(false);
  };
  const goToSettingsMenuHandler = () => {
    setShowPastOrders(false);
    setViewSettings(true);
  };

  return (
    <m.div initial="in" animate="animate" variants={pageAnimation}>
      <Card style="container">
        <section className={styles.profile}>
          <h1>{user.name}</h1>
          {!viewSettings && (
            <>
              <button
                name="Settings"
                onClick={goToSettingsMenuHandler}
                className={styles.viewSettings}
              >
                Settings
              </button>
              <button
                name="Show Past Orders"
                onClick={toggleShowPastOrdersHandler}
                className={styles.viewSettings}
              >
                {showPastOrders ? "Hide Past Orders" : "Show Past Orders"}
              </button>
            </>
          )}
          {viewSettings && (
            <SettingsMenu
              session={props.session}
              onToProfileMenu={goToProfileMenuHandler}
            />
          )}
        </section>
      </Card>
      {showPastOrders && (
        <Suspense fallback={<LoadingSpinner />}>
          <PastOrders />
        </Suspense>
      )}
    </m.div>
  );
}
