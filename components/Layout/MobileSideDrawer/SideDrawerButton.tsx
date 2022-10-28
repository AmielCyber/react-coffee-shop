import { memo } from "react";
// My import
import MenuHamburger from "../Icons/MenuHamburger";
import styles from "./SideDrawerButton.module.css";

type SideDrawerButtonProps = {
  onOpenDrawer: () => void;
};
function SideDrawerButton({ onOpenDrawer }: SideDrawerButtonProps) {
  return (
    <button className={styles.drawerButton} onClick={onOpenDrawer}>
      <MenuHamburger />
    </button>
  );
}
export default memo(SideDrawerButton);
