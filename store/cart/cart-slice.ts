import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// My imports.
import type Cart from "../../models/Cart";
import type DrinkItem from "../../models/DrinkItem";
import type { RootState } from "../index";

// Define the initial state using Cart type
const initialState: Cart = {
  items: [], // DrinkItem[]
  numberOfCartItems: 0,
  totalPrice: 0,
};

/** Cart slice to stored cart items that the user selected for checkout. */
const cartSlice = createSlice({
  // Name of slice.
  name: "cart",
  initialState: initialState,
  reducers: {
    // Methods to modify the cart state.
    /**
     * @param {Cart} state the prev/current state before modifications
     * @param {{id:string, name:string, amount:Number, price:Number}} action.payload
     */
    addItemToCart: (state: Cart, action: PayloadAction<DrinkItem>) => {
      // Get the payload
      const newItem: DrinkItem = action.payload;
      // Update the totalPrice
      state.totalPrice += newItem.price * newItem.amount;
      // Update the total amount of items
      state.numberOfCartItems += newItem.amount;
      // Find the index of the added item if its in our items list
      const cartItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      if (cartItemIndex > -1) {
        // Update the amount for that item.
        state.items[cartItemIndex].amount += newItem.amount;
      } else {
        // A new item was added to our items list.
        state.items.push(newItem);
      }
    },
    /**
     * @param {Cart} state the prev/current state before modifications
     * @param {id:string} action.payload
     */
    removeItemFromCart: (state: Cart, action: PayloadAction<string>) => {
      const id = action.payload;
      // Get the item in our items list.
      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) {
        // Should not be the case but just in case.
        return;
      }
      // Update the total price amount.
      state.totalPrice -= existingItem.price;
      // Update the total amount of items.
      state.numberOfCartItems--;

      if (existingItem.amount === 1) {
        // If the item has no other amount then delete it from our list of items.
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        // Update the total amount of the item.
        existingItem.amount--;
      }
    },
    /**
     * @param {Cart} state the prev/current state before modifications
     * @param {id:string} action.payload.
     */
    removeItemCompletelyFromCart: (
      state: Cart,
      action: PayloadAction<string>
    ) => {
      // Remove an item completely from the cart.
      const id = action.payload;
      // Get the item in our items list.
      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) {
        // Should not be the case but just in case.
        return;
      }
      // Update the total price amount.
      state.totalPrice -= existingItem.price * existingItem.amount;
      // Update the total amount of items.
      state.numberOfCartItems -= existingItem.amount;
      // Completely remove the item from our list;
      state.items = state.items.filter((item) => item.id !== id);
    },
    /**
     * @param {Cart} state the prev/current state before modifications
     */
    clearCart: (state: Cart) => {
      // Reset cart state to an empty cart state.
      state.items = [];
      state.totalPrice = 0;
      state.numberOfCartItems = 0;
    },
    /**
     * @param {Cart} state the prev/current state before modifications
     * @param {{items[]:CartItem, totalPrice:Number, numberOfCartItems:Number}} action.payload
     */
    replaceCart: (state: Cart, action: PayloadAction<Cart>) => {
      // Replace cart from a previous session.
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.numberOfCartItems = action.payload.numberOfCartItems;
    },
  },
});

export const cartActions = cartSlice.actions;

// Will automatically set type to Cart when selecting cart.
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
