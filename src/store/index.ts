import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';

// Configure the Redux store with the provided reducer user
const store = configureStore({
  reducer,
});

export default store;

// Deduce `RootState` and `AppDispatch`types form the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
