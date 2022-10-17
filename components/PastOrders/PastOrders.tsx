import dynamic from "next/dynamic";
// My imports.
import FetchItems from "../../store/fetcher/fetch-items";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import type Order from "../../models/Order";
// CSS import.
import styles from "./PastOrders.module.css";
import { Suspense } from "react";
// My dynamic import.
// Turn off ssr render for this component since it uses client side functions.
const DisplayPastOrders = dynamic(() => import("./DisplayPastOrders"), {
  ssr: false,
});

function PastOrders() {
  const orderArray: Order[] = [];
  const {
    items,
    isLoading,
    isError,
  }: {
    items: Order[] | undefined;
    isLoading: boolean;
    isError: Error | undefined;
  } = FetchItems("/api/order/order", orderArray, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  if (isError) {
    // Error in fetching user's past orders.
    return (
      <Card style="displayContainer">
        <h2 className={styles.orderError}>{isError.message}</h2>
      </Card>
    );
  }
  if (isLoading) {
    // We are still loading user's past orders.
    return (
      <Card style="displayContainer">
        <h2>Loading history...</h2>
        <LoadingSpinner />
      </Card>
    );
  }

  if (items?.length === 0) {
    // User has no past orders.
    return (
      <Card style="displayContainer">
        <h2>You have no past orders.</h2>
      </Card>
    );
  }

  // User has past orders
  return (
    <Card style="orderContainer">
      <Suspense fallback={<LoadingSpinner />}>
        <DisplayPastOrders orders={items} />
      </Suspense>
    </Card>
  );
}

export default PastOrders;
