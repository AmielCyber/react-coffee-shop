import dynamic from "next/dynamic";
// My imports.
import type Drink from "../../models/Drink";
import styles from "./AvailableDrinks.module.css";
import FetchItems from "../../store/fetcher/fetch-items";
// My components.
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
const DrinkItemList = dynamic(() => import("./DrinkItem/DrinkItemList"), {
  loading: () => <LoadingSpinner />,
});

export default function AvailableDrinks() {
  const drinkArray: Drink[] = [];
  const { items, isLoading, isError } = FetchItems(
    "/api/menu/drinks",
    drinkArray,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isError) {
    // Display server error if we had an error connecting to our server.
    return (
      <section className={styles.drinksError}>
        <Card>
          <h3>{isError.message}</h3>
        </Card>
      </section>
    );
  }
  if (isLoading) {
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
  // Display the list of drinks.
  return (
    <section className={styles.drinks}>
      <Card>
        {items ? (
          <DrinkItemList drinks={items} />
        ) : (
          <section className={styles.drinksError}>
            <h3>Could not fetch menu items</h3>
          </section>
        )}
      </Card>
    </section>
  );
}
