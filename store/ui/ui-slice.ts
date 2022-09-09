import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// My type import
import type { RootState } from '../index';
import UI_State from '../../models/UI_State'
import ServerStatus from "../../models/ServerStatus"


const uiDefaultState: UI_State = {
  notification: null,
  fetchCartCompleted: false,
};

// UI slice to show server status notifications to the user or for debugging.
// TO BE USED in next update/push.
const uiSlice = createSlice({
  name: 'ui',
  initialState: uiDefaultState,
  reducers: {
    showNotification: (state: UI_State, action: PayloadAction<ServerStatus>) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    setFetchedCartCompleted(state: UI_State) {
      state.fetchCartCompleted = true;
    },
  },
});

export const uiActions = uiSlice.actions;
export const selectUI = (state: RootState) => state.ui;
export default uiSlice.reducer;
