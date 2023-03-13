import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
// My component imports.
import Modal from "../../UI/Modal";
import Confirmation from "../../UI/Confirmation";
import ResponseStatus from "../../UI/ResponseStatus";

type ConfirmDeletionModalProps = {
  showModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
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
        <Modal onClose={props.onClose}>
          {showConfirmation ? (
            <Confirmation
              confirmationMessage="Are you sure you want to delete your account?"
              onClose={props.onClose}
              onConfirm={props.onConfirm}
            />
          ) : (
            <ResponseStatus
              isLoading={props.isLoading}
              success={props.success}
              statusMessage={props.statusMessage}
              onOkButton={props.onOkButton}
            />
          )}
        </Modal>
      )}
    </AnimatePresence>,
    OverlayElement
  );
}
