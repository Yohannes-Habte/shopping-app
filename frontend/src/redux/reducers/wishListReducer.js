import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishList: [],
};

const wishListReducer = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    // Add to wish list
    addToWishlist: (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishList.find((i) => i._id === item._id);
      if (isItemExist) {
        return {
          ...state,
          wishlist: state.wishList.map((i) =>
            i._id === isItemExist._id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, item],
        };
      }
    },

    // Remove from wish list

    removeFromWishlist: (state, action) => {
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item._id !== action.payload),
      };
    },
  },
});

// Destructure wishlist reducer methods
export const { addToWishlist, removeFromWishlist } = wishListReducer.actions;

// export wishlist reducer
export default wishListReducer.reducer;
