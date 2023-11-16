import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // User Login
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
      state.loading = false;
    },

    // Update user profile
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    updateUserFilure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Delete user
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // User log out
    userLogoutStart: (state) => {
      state.loading = true;
    },
    userLogoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    userLogoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Destructure user reducer methods
export const {
  loginStart,
  loginSuccess,
  loginFailure,

  updateUserStart,
  updateUserSuccess,
  updateUserFilure,

  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,

  userLogoutStart,
  userLogoutSuccess,
  userLogoutFailure,
} = userReducer.actions;

// exoirt userSlice
export default userReducer.reducer;
