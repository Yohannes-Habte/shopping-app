import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add to cart
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
        return {
          ...state,
          cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    },

    // Remove from cart
    removeFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((i) => i._id !== action.payload),
      };
    },
  },
});

// Destructure wishlist reducer methods
export const { addToCart, removeFromCart } = cartReducer.actions;

// export wishlist reducer
export default cartReducer.reducer;
