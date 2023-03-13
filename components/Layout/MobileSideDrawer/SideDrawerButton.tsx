import { memo } from "react";
// My import
import MenuHamburger from "../Icons/MenuHamburger";
import styles from "./SideDrawerButton.module.css";

type SideDrawerButtonProps = {
  onOpenDrawer: () => void;
};

function SideDrawerButton(props: SideDrawerButtonProps) {
  return (
    <button className={styles.drawerButton} onClick={props.onOpenDrawer}>
      <MenuHamburger />
    </button>
  );
}
export default memo(SideDrawerButton);
