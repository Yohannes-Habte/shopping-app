import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: null,
  error: null,
  loading: false,
  success: false,
};

const eventReducer = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // Get event
    eventFetchStart: (state) => {
      state.loading = true;
      state.error = null;
      state.events = null;
    },
    eventFetchSuccess: (state, action) => {
      state.events = action.payload;
      state.loading = false;
      state.error = null;
    },
    eventFetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.events = null;
    },
  },
});

// Destructure event reducer methods under the reducers key
export const { eventFetchStart, eventFetchSuccess, eventFetchFailure } =
  eventReducer.actions;

export default eventReducer.reducer;
