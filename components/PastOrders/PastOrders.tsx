import dynamic from "next/dynamic";
// My imports.
import type Order from "../../models/Order";
import styles from "./PastOrders.module.css";
import FetchItems from "../../store/fetcher/fetch-items";
// My components.
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
// Turn off ssr render for this component since it uses client side functions.
const DisplayPastOrders = dynamic(() => import("./DisplayPastOrders"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

type fetchOrderedReturnType = {
  items: Order[];
  isLoading: boolean;
  isError: Error | undefined;
};

export default function PastOrders() {
  const orderArray: Order[] = [];
  const { items, isLoading, isError }: fetchOrderedReturnType = FetchItems(
    "/api/orders",
    orderArray,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

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
}
