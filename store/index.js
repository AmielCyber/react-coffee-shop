import { configureStore } from '@reduxjs/toolkit';
// My imports.
import cartSlice from './cart/cart-slice';
import uiSlice from './ui/ui-slice';

// Redux states: cart state and the UI state for server status display.
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
