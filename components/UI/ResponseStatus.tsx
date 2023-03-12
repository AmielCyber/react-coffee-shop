import styles from "./ResponseStatus.module.css";
type ResponseStatusProps = {
  success: boolean;
  statusMessage: string;
  onOkButton: () => void;
};
export default function ResponseStatus(props: ResponseStatusProps) {
  const headingStyle = props.success ? styles.successful : styles.error;
  return (
    <>
      <h3 className={headingStyle}>{props.statusMessage}</h3>
      <div className={`globalButton ${styles.okButton}`}>
        <button onClick={props.onOkButton}>Ok</button>
      </div>
    </>
  );
}
