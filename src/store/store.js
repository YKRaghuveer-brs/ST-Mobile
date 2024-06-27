import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiSlice} from './apiSlice.js';
import authReducer from './user/authSlice.js';
import {combineReducers} from 'redux';
import {spotifyRootApiSlice} from './spotify/spotifyRootApiSlice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [spotifyRootApiSlice.reducerPath]: spotifyRootApiSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Only persist the auth slice
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(apiSlice.middleware, spotifyRootApiSlice.middleware),
});
export const persistor = persistStore(store);

export default store;
