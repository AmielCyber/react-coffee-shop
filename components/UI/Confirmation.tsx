import styles from "./Confirmation.module.css";

type ConfirmationProps = {
  confirmationMessage: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function Confirmation(props: ConfirmationProps) {
  return (
    <>
      <h2 className={styles.message}>{props.confirmationMessage}</h2>
      <div className={styles.selectionButtons + " globalButton"}>
        <button onClick={props.onClose}>No</button>
        <button onClick={props.onConfirm}>Yes</button>
      </div>
    </>
  );
}
