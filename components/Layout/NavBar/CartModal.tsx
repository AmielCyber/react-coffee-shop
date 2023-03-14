import dynamic from "next/dynamic";
import { memo } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
// My component imports.
import Modal from "../../UI/Modal";
import LoadingSpinner from "../../UI/LoadingSpinner";
const Cart = dynamic(() => import("../../Cart/Cart"), {
  loading: () => <LoadingSpinner />,
});

type CartModalProps = {
  cartIsShown: boolean;
  onClose: () => void;
  onToSignIn: () => void;
};

function cartStateChanged(
  prevProps: CartModalProps,
  nextProps: CartModalProps
) {
  // Only rerender if cartIsShown has changed.
  return prevProps.cartIsShown === nextProps.cartIsShown;
}

const OverlayElement = document.querySelector("#overlays") as HTMLElement;

function CartModal(props: CartModalProps) {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {props.cartIsShown && (
        <Modal onClose={props.onClose}>
          <Cart onClose={props.onClose} onToSignIn={props.onToSignIn} />
        </Modal>
      )}
    </AnimatePresence>,
    OverlayElement
  );
}

export default memo(CartModal, cartStateChanged);
