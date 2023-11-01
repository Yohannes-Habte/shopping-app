import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';

// create Sore variable
const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Export Store variable
export default Store;
