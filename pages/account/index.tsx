import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import Head from "next/head";
import { m } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// My imports.
import { pageAnimation } from "../../utils/animations/animation";
import coffeeLove from "../../assets/coffeeLove.jpg";
import Card from "../../components/UI/Card";
import UserProfile from "../../components/Profile/UserProfile";
import LoadingSpinner from "components/UI/LoadingSpinner";
// CSS import.
import styles from "./AccountPage.module.css";
// My dynamic import.
const PastOrders = dynamic(
  () => import("../../components/PastOrders/PastOrders"),
  { ssr: false }
);

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [showPastOrders, setShowPastOrders] = useState(false);
  const router = useRouter();

  const toggleShowPastOrdersHandler = () => {
    setShowPastOrders((prevState) => !prevState);
  };

  if (status === "authenticated") {
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
            fill
          />
        </div>
        <m.div initial="in" animate="animate" variants={pageAnimation}>
          <Card style="container">
            <UserProfile session={session} />
          </Card>
          <div
            className={styles.toggleShowOrders}
            onClick={toggleShowPastOrdersHandler}
            role="button"
          >
            <Card style="displayContainer">
              <h2>
                {showPastOrders ? "Hide Past Orders" : "Show Past Orders"}
              </h2>
            </Card>
          </div>
          {showPastOrders && (
            <Suspense fallback={`Loading Past Orders...`}>
              <PastOrders />
            </Suspense>
          )}
        </m.div>
      </>
    );
  }
  if (status === "loading") {
    return <LoadingSpinner />;
  }
  if (status === "unauthenticated") {
    router.push("/");
  }
}
