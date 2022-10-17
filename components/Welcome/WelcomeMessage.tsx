import { useSession } from "next-auth/react";
import Link from "next/link";
// My imports.
import styles from "./WelcomeMessage.module.css";

function WelcomeMessage() {
  const { data: session } = useSession();

  let userGreetingMsg = "";
  if (session) {
    userGreetingMsg = `back ${session.user.name}, `;
  }

  return (
    <section className={styles.message}>
      <h2>{`Welcome ${userGreetingMsg}to React Coffee!`}</h2>
      <p>
        <Link href="/menu" passHref>
          <a>Order fresh coffee to go now!</a>
        </Link>
      </p>
    </section>
  );
}

export default WelcomeMessage;
