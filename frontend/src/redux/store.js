import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import orderReducer from './reducers/orderReducer';
import sellerReducer from './reducers/sellerReducer';
import productReducer from './reducers/productReducer';
import evnetReducer from './reducers/evnetReducer';

// Store items in the local storage
const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  seller: sellerReducer,
  product: productReducer,
  event: evnetReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create Sore variable
export const Store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export persistor
export const persistor = persistStore(Store);
