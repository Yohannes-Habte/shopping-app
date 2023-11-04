import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: null,
  error: null,
  loading: false,
};

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Get order
    orderFetchStart: (state) => {
      state.loading = true;
      state.error = null;
      state.orders = null;
    },
    orderFetchSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    orderFetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.orders = null;
    },
  },
});

// Destructure order reducer methods under the reducers key
const { orderFetchStart, orderFetchSuccess, orderFetchFailure } =
  orderReducer.reducer;

export default orderReducer.reducer;
