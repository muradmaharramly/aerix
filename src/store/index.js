import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import uiReducer from './uiSlice';
import locationReducer from './locationSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    ui: uiReducer,
    location: locationReducer,
  },
});
