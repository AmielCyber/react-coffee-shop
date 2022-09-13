import { memo, Suspense } from "react";
import dynamic from "next/dynamic";
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

// Only rerender if cartIsShown has changed.
function cartStateChanged(
  prevProps: CartModalProps,
  nextProps: CartModalProps
) {
  return prevProps.cartIsShown === nextProps.cartIsShown;
}

const OverlayElement = document.querySelector("#overlays") as HTMLElement;

const CartModal = ({ cartIsShown, onClose, onToSignIn }: CartModalProps) => {
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
};

export default memo(CartModal, cartStateChanged);
