import { uiActions } from '../ui/ui-slice';
import { cartActions } from './cart-slice';

/**
 * Fetch cart data from server from previous session.
 * @returns Cart object.{id:string, name:string, amount:Number, price:Number}
 */
export const fetchCartData = () => {
  return async (dispatch) => {
    // Begin server session.
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Fetching...',
        message: 'Fetching data from previous session.',
      }),
    );

    // Call our api route.
    const fetchData = async () => {
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
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalPrice: cartData.totalPrice || 0,
          numberOfCartItems: cartData.numberOfCartItems || 0,
        }),
      );
      // Succeeded a server fetch.
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Fetch data from last session successfully!',
      });
    } catch (error) {
      // Failed to fetch the data.
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        }),
      );
    }
  };
};
/**
 * Sends the cart data to the server api.
 * @param {Cart:{id:string, name:string, amount:Number, price:Number}} cart
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
      }),
    );

    // Connect to the server via api route.
    const sendRequest = async () => {
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
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: error.message,
        }),
      );
    }
  };
};
