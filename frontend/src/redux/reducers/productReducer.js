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
    // Post product
    productPostStart: (state) => {
      state.loading = true;
      state.error = null;
      state.products = null;
    },
    productPostSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    productPostFailure: (state, action) => {
      state.error = action.payload;
      state.products = null;
      state.loading = false;
    },

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
export const {
  productPostStart,
  productPostSuccess,
  productPostFailure,
  productFetchStart,
  productFetchSuccess,
  productFetchFailure,
} = productReducer.actions;

export default productReducer.reducer;
