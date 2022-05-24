import { createSlice } from '@reduxjs/toolkit';

// UI slice to show server status notifications to the user or for debugging.
// TO BE USED in next update/push.
const uiSlice = createSlice({
  name: 'ui',
  initialState: { notification: null, isInitial: true },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    disableInitial(state) {
      state.isInitial = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
