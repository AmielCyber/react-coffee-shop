import { getSession } from "next-auth/react";
// My imports.
import type { AppDispatch } from "../index";
import { uiActions } from "../ui/ui-slice";
import { cartActions } from "./cart-slice";
// Import Types
import ServerStatus from "../../models/ServerStatus";
import Cart from "../../models/Cart";

// Local cart storage name
export const CART_STORAGE_NAME = "react-coffee-cart-session";

/**
 * Gets a previous cart session from our server.
 * @returns Cart Object
 */
async function fetchCartDataFromServer() {
  // Call our api route.
  const response = await fetch("/api/cart-sessions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch cart data!");
  }
  const data = await response.json();
  return data;
}

/**
 * Gets a previous cart session from the local storage in the browser.
 * @returns Cart Object
 */
function fetchCartDataFromLocal() {
  let cartData = null;

  const localCartData = window.localStorage.getItem(CART_STORAGE_NAME);
  if (localCartData) {
    cartData = JSON.parse(localCartData);
  }

  return cartData;
}

/**
 * Gets a cart object from a previous session if there is one and replaces the cart in our redux state.
 */
export const fetchCartData = () => {
  return async (dispatch: AppDispatch) => {
    // Begin cart fetching session.
    let currentStatus: ServerStatus = {
      status: "pending",
      title: "Fetching...",
      message: "Fetching data from previous session.",
    };
    dispatch(uiActions.showNotification(currentStatus));

    // Login page updates the cart data session if local storage had items, hence no race condition.
    const session = await getSession();

    // Cart object: {id:string, name:string, amount:Number, price:Number} or null if there is no previous cart session.
    let cartData: Cart | null = null;
    try {
      if (session) {
        // Fetch data from user session if there is one.
        cartData = await fetchCartDataFromServer();
      } else {
        // Fetch data from guest session if there is one.
        cartData = fetchCartDataFromLocal();
      }
      if (cartData) {
        // If previous session was found and successfully acquired the cartData.
        const newCart: Cart = {
          items: cartData.items || [],
          totalPrice: cartData.totalPrice || 0,
          numberOfCartItems: cartData.numberOfCartItems || 0,
        };
        dispatch(cartActions.replaceCart(newCart));

        currentStatus = {
          status: "success",
          title: "Success!",
          message: "Fetch data from last session successfully!",
        };
        uiActions.showNotification(currentStatus);
      } else {
        // No previous session found from either from user or guest session.
        // MAY UPDATE to status: 'completed'
        currentStatus = {
          status: "success",
          title: "Success!",
          message: "Fetch data from last session successfully!",
        };
        uiActions.showNotification(currentStatus);
      }
    } catch (error) {
      // Failed to fetch the data.
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message:
            error instanceof Error ? error.message : "Something went wrong.",
        })
      );
    }
    // Marked session fetch to avoid race conditions with sending cart data before we fetched.
    dispatch(uiActions.setFetchedCartCompleted());
  };
};

/**
 * Sends the current cart data to our server.
 * @param {Cart Object} cart
 */
async function sendCartDataToServer(cart: Cart) {
  const response = await fetch("/api/cart-sessions", {
    method: "POST",
    body: JSON.stringify(cart),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Sending cart data failed.");
  }
}

/**
 * Sends the current cart data to the browser's local storage.
 * @param {Cart Object} cart
 */
function sendCartDataToLocal(cart: Cart) {
  window.localStorage.setItem(CART_STORAGE_NAME, JSON.stringify(cart));
}

/**
 * Sends the cart data to our server if user is in session,
 * else sends the cart data to the browser's storage if guest is in session.
 * @param {Cart Object} cart {id:string, name:string, amount:Number, price:Number}
 * @returns void
 */
export const sendCartData = (cart: Cart) => {
  return async (dispatch: AppDispatch) => {
    // Begin server connection.
    let currentStatus: ServerStatus = {
      status: "pending",
      title: "Sending...",
      message: "Sending cart data!",
    };
    dispatch(uiActions.showNotification(currentStatus));

    const session = await getSession();
    try {
      if (session) {
        await sendCartDataToServer(cart);
      } else {
        sendCartDataToLocal(cart);
      }
      currentStatus = {
        status: "success",
        title: "Success!",
        message: "Sent cart data successfully!",
      };
    } catch (error) {
      currentStatus = {
        status: "error",
        title: "Error!",
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      };
    }
    dispatch(uiActions.showNotification(currentStatus));
  };
};
