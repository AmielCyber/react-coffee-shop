import dynamic from "next/dynamic";
import React from "react";
// My imports.
import type Order from "../../models/Order";
import FetchItems from "../../store/fetcher/fetch-items";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
// CSS import.
import styles from "./PastOrders.module.css";
// My dynamic import.
// Turn off ssr render for this component since it uses client side functions.
const DisplayPastOrders = dynamic(() => import("./DisplayPastOrders"), {
  ssr: false,
});

const PastOrders = () => {
  const orderArray: Order[] = [];
  const {
    items,
    isLoading,
    isError,
  }: {
    items: Order[] | undefined;
    isLoading: boolean;
    isError: Error | undefined;
  } = FetchItems("/api/order/order", orderArray);

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
      <DisplayPastOrders orders={items} />
    </Card>
  );
};

export default PastOrders;
