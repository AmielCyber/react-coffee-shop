import dynamic from "next/dynamic";
import { Suspense } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
// My component imports.
import LoadingSpinner from "../../UI/LoadingSpinner";
const Modal = dynamic(() => import("../../UI/Modal"));
const Confirmation = dynamic(() => import("../../UI/Confirmation"));
const ResponseStatus = dynamic(() => import("../../UI/ResponseStatus"));

type ConfirmDeletionModalProps = {
  showModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  success: boolean;
  statusMessage: string;
  onOkButton: () => void;
};

const OverlayElement = document.querySelector("#overlays") as HTMLElement;

export default function ConfirmDeletionModal(props: ConfirmDeletionModalProps) {
  const showConfirmation = props.statusMessage === "";

  return ReactDOM.createPortal(
    <AnimatePresence>
      {props.showModal && (
        <Suspense fallback={<LoadingSpinner />}>
          <Modal onClose={props.onClose}>
            {showConfirmation ? (
              <Confirmation
                confirmationMessage="Are you sure you want to delete your account?"
                onClose={props.onClose}
                onConfirm={props.onConfirm}
              />
            ) : (
              <ResponseStatus
                success={props.success}
                statusMessage={props.statusMessage}
                onOkButton={props.onOkButton}
              />
            )}
          </Modal>
        </Suspense>
      )}
    </AnimatePresence>,
    OverlayElement
  );
}
