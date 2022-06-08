import React from 'react';
// My imports.
import FetchItems from '../../store/fetcher/fetch-items';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import DrinkItemList from './DrinkItem/DrinkItemList';
// CSS import.
import styles from './AvailableDrinks.module.css';

export default function AvailableDrinks() {
  const { items, isLoading, isError } = FetchItems('/api/menu/drinks');

  // Display server error.
  if (isError) {
    return (
      <section className={styles.drinksError}>
        <Card>
          <h3>{isError.message}</h3>
        </Card>
      </section>
    );
  }
  // Display loading content since we do not have our data yet.
  if (isLoading) {
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
        <DrinkItemList drinks={items} />
      </Card>
    </section>
  );
}
