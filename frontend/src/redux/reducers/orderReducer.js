import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  error: '',
  loading: false,
};

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Get all orders of a user
    userOrdersRequest: (state) => {
      state.loading = true;
    },
    userOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    userOrdersFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Get all orders of a seller/shop
    sellerOrdersRequest: (state) => {
      state.loading = true;
    },
    sellerOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    sellerOrdersFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Destructure order reducer methods under the reducers key
export const {
  // User orders
  userOrdersRequest,
  userOrdersSuccess,
  userOrdersFail,

  // Seller orders
  sellerOrdersRequest,
  sellerOrdersSuccess,
  sellerOrdersFail,
} = orderReducer.actions;

export default orderReducer.reducer;
