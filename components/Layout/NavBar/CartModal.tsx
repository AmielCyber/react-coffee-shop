import dynamic from "next/dynamic";
import { memo, Suspense } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
// My imports.
import LoadingSpinner from "../../UI/LoadingSpinner";
// My dynamic import.
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

function CartModal({ cartIsShown, onClose, onToSignIn }: CartModalProps) {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {cartIsShown && (
        <Suspense fallback={<LoadingSpinner />}>
          <Modal onClose={onClose}>
            <Cart onClose={onClose} onToSignIn={onToSignIn} />
          </Modal>
        </Suspense>
      )}
    </AnimatePresence>,
    OverlayElement
  );
}

export default memo(CartModal, cartStateChanged);
