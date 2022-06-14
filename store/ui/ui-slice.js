import { createSlice } from '@reduxjs/toolkit';

const uiDefaultState = {
  notification: null,
  fetchCartCompleted: false,
};

// UI slice to show server status notifications to the user or for debugging.
// TO BE USED in next update/push.
const uiSlice = createSlice({
  name: 'ui',
  initialState: uiDefaultState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    setFetchedCartCompleted(state) {
      state.fetchCartCompleted = true;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
