import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: null,
  error: null,
  loading: false,
};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Get product
    productFetchStart: (state) => {
      state.loading = true;
      state.error = null;
      state.products = null;
    },
    productFetchSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    productFetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.products = null;
    },
  },
});

// Destructure product reducer methods under the reducers key
const { productFetchStart, productFetchSuccess, productFetchFailure } =
  productReducer.reducer;

export default productReducer.reducer;
