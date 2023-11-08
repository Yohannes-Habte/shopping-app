import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: null,
  error: null,
  loading: false,
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
const { eventFetchStart, eventFetchSuccess, eventFetchFailure } =
eventReducer.reducer;

export default eventReducer.reducer;
