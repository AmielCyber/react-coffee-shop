import dynamic from "next/dynamic";
import { memo, Suspense } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
// My component imports.
import LoadingSpinner from "../../UI/LoadingSpinner";
const Modal = dynamic(() => import("../../UI/Modal"));
const Cart = dynamic(() => import("../../Cart/Cart"));

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
        <Suspense fallback={<LoadingSpinner />}>
          <Modal onClose={props.onClose}>
            <Cart onClose={props.onClose} onToSignIn={props.onToSignIn} />
          </Modal>
        </Suspense>
      )}
    </AnimatePresence>,
    OverlayElement
  );
}

export default memo(CartModal, cartStateChanged);
