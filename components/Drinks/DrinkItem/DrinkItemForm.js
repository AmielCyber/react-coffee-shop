import React, { useState } from 'react';
// CSS import.
import styles from './DrinkItemForm.module.css';

// Max order items at a time.
const MAX_INPUT_NUM = 5;
/**
 * Creates a list of number of options.
 * @returns Number of options [1-MAX_INPUT_NUM]
 */
function getNumberOptions() {
  const numberOptionList = [];
  for (let numberOfItems = 1; numberOfItems <= MAX_INPUT_NUM; numberOfItems++) {
    numberOptionList.push(
      <option key={'amount:' + numberOfItems} value={numberOfItems}>
        {numberOfItems}
      </option>
    );
  }
  return numberOptionList;
}

export default function DrinkItemForm(props) {
  const [amount, setAmount] = useState(1);

  const submitHandler = (event) => {
    event.preventDefault(); // Prevent DOM default to send to a server.
    const enteredAmount = amount;
    const enteredAmountNum = +enteredAmount; // Make sure is a Number.
    // Add the newly number of a drink item to the cart.
    props.onAddToCart(enteredAmountNum);
  };

  const handleChange = (event) => {
    const enteredAmount = +event.target.value; // + transform String to a Number
    setAmount(enteredAmount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.amount}>
        <label htmlFor={props.id}>Amount:</label>
        <select id={props.id} onChange={handleChange}>
          {getNumberOptions()}
        </select>
      </div>
      <button>+ Add</button>
    </form>
  );
}
