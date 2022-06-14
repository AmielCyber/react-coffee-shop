import { getSession } from 'next-auth/react';
// My imports.
import { uiActions } from '../ui/ui-slice';
import { cartActions } from './cart-slice';

// Local cart storage name
export const CART_STORAGE_NAME = 'react-coffee-cart-session';

/**
 * Gets a previous cart session from our server.
 * @returns Cart Object
 */
async function fetchCartDataFromServer() {
  // Call our api route.
  const response = await fetch('/api/cart/cart', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not fetch cart data!');
  }
  const data = await response.json();
  return data;
}

/**
 * Gets a previous cart session from saved in the browser.
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
 * Gets a cart objec from a previous session if there is one and replaces the cart in our redux state.
 */
export const fetchCartData = () => {
  return async (dispatch) => {
    // Begin cart fetching session.
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Fetching...',
        message: 'Fetching data from previous session.',
      })
    );
    // Login page updates the cart data session if local storage had items, hence no race condition.
    const session = await getSession();

    // Cart object: {id:string, name:string, amount:Number, price:Number} or null if there is no previous cart session.
    let cartData = null;
    try {
      if (session) {
        // Fetch data from user session if there is one.
        cartData = await fetchCartDataFromServer();
      } else {
        // Fetch data from guest session if there is one.
        cartData = fetchCartDataFromLocal();
      }
      if (cartData) {
        // If previous session was found and successfully aquired the cartData.
        dispatch(
          cartActions.replaceCart({
            items: cartData.items || [],
            totalPrice: cartData.totalPrice || 0,
            numberOfCartItems: cartData.numberOfCartItems || 0,
          })
        );
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Fetch data from last session successfully!',
        });
      } else {
        // No previous session found from either from user or guest session.
        // MAY UPDATE to status: 'completed'
        uiActions.showNotification({
          status: 'success',
          title: 'No data session found.',
          message: 'There was nothing to fetch.',
        });
      }
    } catch (error) {
      // Failed to fetch the data.
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        })
      );
    }
    dispatch(uiActions.setFetchedCartCompleted());
  };
};

/**
 * Sends current cart data to our server.
 * @param {Cart Object} cart
 */
async function sendCartDataToServer(cart) {
  const response = await fetch('/api/cart/cart', {
    method: 'POST',
    body: JSON.stringify(cart),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Sending cart data failed.');
  }
}

/**
 * Sends the current cart data to the browser's storage.
 * @param {Cart Object} cart
 */
function sendCartDataToLocal(cart) {
  window.localStorage.setItem(CART_STORAGE_NAME, JSON.stringify(cart));
}

/**
 * Sends the cart data to our server if user is in session,
 * else sends the cart data to the browser's storage if guest is in session.
 * @param {Cart Object} cart {id:string, name:string, amount:Number, price:Number}
 * @returns void
 */
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // Begin server connection.
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const session = await getSession();
    try {
      if (session) {
        await sendCartDataToServer(cart);
      } else {
        sendCartDataToLocal(cart);
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        })
      );
    }
  };
};
