import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// My imports.
import styles from "./AccountPage.module.css";
import coffeeLove from "../../public/background/coffeeLove.jpg";
// My components.
import LoadingSpinner from "components/UI/LoadingSpinner";
const AccountMenu = dynamic(
  () => import("../../components/Account/AccountMenu"),
  { loading: () => <LoadingSpinner /> }
);

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  if (status === "loading" || session === null) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
        <title>View your account.</title>
        <meta
          name="description"
          content="Change your password or view your past orders."
          title="title"
        />
      </Head>
      <div className={styles.accountPageImage}>
        <Image
          alt="A coffee cup in a white background and letters spelling LOVE"
          src={coffeeLove}
          title="Image by @inchristalone from Unsplash"
          quality={80}
          placeholder="blur"
          blurDataURL="/blur/accountBlur.png"
          fill
        />
      </div>
      <AccountMenu session={session} />
    </>
  );
}
