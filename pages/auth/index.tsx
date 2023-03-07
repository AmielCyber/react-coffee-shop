import { useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { m } from "framer-motion";
// My imports.
import coffeeImage from "../../assets/coffeeWhiteBackground.jpg";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { pageAnimation } from "../../utils/animations/animation";
import AuthForm from "../../components/Auth/AuthForm";
// CSS import.
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";

  useEffect(() => {
    if (session) {
      // If there is a session, then just redirect user to the home page.
      router.replace("/");
    }
  }, [router, session]);

  // There is no session, hence we prompt the user to sign in.
  return (
    <>
      <Head>
        <title>Sign In to React Coffee!</title>
        <meta
          name="description"
          content="Sign in to react coffee! Or Sign up to see your past orders."
          title="title"
        />
      </Head>
      <div className={styles.authPageImage}>
        <Image
          alt="Latte on top of a white table"
          title="Image by @heftiba from Unsplash"
          src={coffeeImage}
          quality={50}
          placeholder="blur"
          fill
        />
      </div>
      {isLoading && (
        <section className={styles.container}>
          <Card>
            <p>Loading...</p>
            <LoadingSpinner />
          </Card>
        </section>
      )}
      {!isLoading && (
        <m.div initial="in" animate="animate" variants={pageAnimation}>
          <Card style="slim">
            <AuthForm />
          </Card>
        </m.div>
      )}
    </>
  );
}
