import styles from "./GuestPrompt.module.css";
type GuestPromptProps = {
  onContinue: VoidFunction;
  onToSignIn: VoidFunction;
};
export default function GuestPrompt(props: GuestPromptProps) {
  // Prompt if a guest user wants to continue as guest.
  return (
    <div className={styles.guestPrompt}>
      <h2>Continue as guest?</h2>
      <div className={styles.actions}>
        <button onClick={props.onContinue}>Yes</button>
        <button onClick={props.onToSignIn}>Sign in/Create Account</button>
      </div>
    </div>
  );
}
