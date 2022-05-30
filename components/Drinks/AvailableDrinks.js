import React from 'react';
import useSWR from 'swr';
// My imports.
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import DrinkItemList from './DrinkItem/DrinkItemList';
// CSS import.
import styles from './AvailableDrinks.module.css';

// Fetcher for the SWR state.
async function fetcher(url) {
  const response = await fetch(url);
  const responseData = await response.json();
  if (!response.ok) {
    // Make SWR catch the failed response.
    throw new Error(responseData.message);
  }
  return responseData;
}

export default function AvailableDrinks() {
  const { data, error } = useSWR('/api/menu/drinks', fetcher);

  if (error) {
    // Display server error.
    return (
      <section className={styles.drinksError}>
        <Card>
          <h3>{error.message}</h3>
        </Card>
      </section>
    );
  }
  if (!data) {
    // Display loading content since we do not have our data yet.
    return (
      <section className={styles.drinksLoading}>
        <Card>
          <p>Loading...</p>
          <LoadingSpinner />
        </Card>
      </section>
    );
  }
  // Diplay the list of drinks.
  return (
    <section className={styles.drinks}>
      <Card>
        <DrinkItemList drinks={data} />
      </Card>
    </section>
  );
}
