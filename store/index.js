import { configureStore } from '@reduxjs/toolkit';
// My imports.
import cartSlice from './cart/cart-slice';
import uiSlice from './ui/ui-slice';

// Export our redux store.
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer, // For tracking our cart state.
    ui: uiSlice.reducer, // For tracking server status.
  },
});

export default store;
