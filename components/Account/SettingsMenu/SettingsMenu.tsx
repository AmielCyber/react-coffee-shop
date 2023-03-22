import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { useState } from "react";
// My imports.
import styles from "./SettingsMenu.module.css";
// My components.
import MenuTitle from "./MenuTitle";
import LoadingSpinner from "components/UI/LoadingSpinner";
const PasswordForm = dynamic(() => import("./PasswordForm"), {
  loading: () => <LoadingSpinner />,
});
const DeleteAccountMenu = dynamic(() => import("./DeleteAccountMenu"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

type MenuType = "settings" | "password" | "delete";

function getMenuTitle(menuType: MenuType): string {
  switch (menuType) {
    case "settings": {
      return "Settings";
    }
    case "password": {
      return "Change Password";
    }
    case "delete": {
      return "Delete Account";
    }
    default:
      throw new Error("Invalid args in getMenuTitle");
  }
}

function getMenuComponent(
  menuType: MenuType,
  session: Session
): JSX.Element | null {
  switch (menuType) {
    case "settings": {
      return null;
    }
    case "password": {
      return <PasswordForm session={session} />;
    }
    case "delete": {
      return <DeleteAccountMenu session={session} />;
    }
    default:
      throw new Error("Invalid args in getMenuTitle");
  }
}

type SettingsMenuProps = {
  session: Session;
  onToProfileMenu: () => void;
};
export default function SettingsMenu(props: SettingsMenuProps) {
  const [menuType, setMenuType] = useState<MenuType>("settings");

  return (
    <>
      <MenuTitle title={getMenuTitle(menuType)} />
      {menuType == "settings" && (
        <>
          <menu className={styles.menu}>
            <section className={styles.menuSelection}>
              <li>
                <button
                  name="Change Password"
                  onClick={() => setMenuType("password")}
                >
                  Change Password
                </button>
              </li>
              <li>
                <button
                  name="Delete Account"
                  onClick={() => setMenuType("delete")}
                >
                  Delete Account
                </button>
              </li>
            </section>
          </menu>
          <div className="globalButton">
            <button
              name="Settings"
              onClick={props.onToProfileMenu}
              className="globalButton"
            >
              Back
            </button>
          </div>
        </>
      )}
      {menuType !== "settings" && (
        <>
          {getMenuComponent(menuType, props.session)}
          <div className="globalButton">
            <button name="Settings" onClick={() => setMenuType("settings")}>
              Back
            </button>
          </div>
        </>
      )}
    </>
  );
}
