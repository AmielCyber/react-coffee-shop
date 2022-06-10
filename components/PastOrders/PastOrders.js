import React from 'react';
// My imports.
import FetchItems from '../../store/fetcher/fetch-items';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import DisplayPastOrders from './DisplayPastOrders';
// CSS import.
import styles from './PastOrders.module.css';

export default function PastOrders() {
  const { items, isLoading, isError } = FetchItems('/api/order/order');

  if (isError) {
    // Error in fetching user's past orders.
    return (
      <Card style='displayContainer'>
        <h2 className={styles.orderError}>{isError.message}</h2>
      </Card>
    );
  }
  if (isLoading) {
    // We are still loading user's past orders.
    return (
      <Card style='displayContainer'>
        <h2>Loading history...</h2>
        <LoadingSpinner />
      </Card>
    );
  }

  if (items.length === 0) {
    // User has no past orders.
    return (
      <Card style='displayContainer'>
        <h2>There are no past orders.</h2>
      </Card>
    );
  }

  // User has past orders
  return (
    <Card style='orderContainer'>
      <DisplayPastOrders orders={items} />
    </Card>
  );
}
