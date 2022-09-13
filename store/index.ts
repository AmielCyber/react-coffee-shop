import { configureStore } from "@reduxjs/toolkit";
// My imports.
import cartReducer from "./cart/cart-slice";
import uiReducer from "./ui/ui-slice";

// Export our redux store.
const store = configureStore({
  reducer: {
    cart: cartReducer, // For tracking our cart state.
    ui: uiReducer, // For tracking server status.
  },
});

// Export React Redux toolkit types.
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
