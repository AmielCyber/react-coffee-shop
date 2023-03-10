import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { useState } from "react";
import MenuTitle from "./MenuTitle";
import styles from "./SettingsMenu.module.css";
const DeleteAccountMenu = dynamic(() => import("./DeleteAccountMenu"), {
  ssr: false,
});
const PasswordForm = dynamic(() => import("./PasswordForm"), {
  ssr: false,
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
      return <PasswordForm userEmail={session.user.email} />;
    }
    case "delete": {
      return <DeleteAccountMenu userEmail={session.user.email} />;
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

  const selectMenuHandler = (selectedMenu: MenuType) => {
    setMenuType(selectedMenu);
  };

  const goBackToSettingsHandler = () => {
    setMenuType("settings");
  };

  return (
    <>
      <MenuTitle title={getMenuTitle(menuType)} />
      {menuType == "settings" && (
        <>
          <section className={styles.menu}>
            <section className={styles.menuSelection}>
              <button
                name="Change Password"
                onClick={() => selectMenuHandler("password")}
              >
                Change Password
              </button>
              <button
                name="Delete Account"
                onClick={() => selectMenuHandler("delete")}
              >
                Delete Account
              </button>
            </section>
            <div className="globalButton">
              <button
                name="Settings"
                onClick={props.onToProfileMenu}
                className="globalButton"
              >
                Back
              </button>
            </div>
          </section>
        </>
      )}
      {menuType !== "settings" && (
        <>
          {getMenuComponent(menuType, props.session)}
          <div className="globalButton">
            <button name="Settings" onClick={goBackToSettingsHandler}>
              Back
            </button>
          </div>
        </>
      )}
    </>
  );
}
