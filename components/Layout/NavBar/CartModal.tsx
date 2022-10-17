import dynamic from "next/dynamic";
import { memo, Suspense } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
// My imports.
import Modal from "../../UI/Modal";
import LoadingSpinner from "../../UI/LoadingSpinner";
// My dynamic import.
const Cart = dynamic(() => import("../../Cart/Cart"), { ssr: false });

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
        <Modal onClose={onClose}>
          <Suspense fallback={<LoadingSpinner />}>
            <Cart onClose={onClose} onToSignIn={onToSignIn} />
          </Suspense>
        </Modal>
      )}
    </AnimatePresence>,
    OverlayElement
  );
}

export default memo(CartModal, cartStateChanged);
