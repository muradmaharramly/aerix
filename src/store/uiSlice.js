import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  isLoading: false,
  error: null,
  units: 'metric', // 'metric' or 'imperial'
  filter: {
    weatherType: 'all', // 'all', 'sunny', 'cloudy', 'rainy'
    tempRange: 'all', // 'all', 'freezing', 'cold', 'mild', 'warm', 'hot'
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleUnits: (state) => {
      state.units = state.units === 'metric' ? 'imperial' : 'metric';
    },
    setWeatherTypeFilter: (state, action) => {
      state.filter.weatherType = action.payload;
    },
    setTempRangeFilter: (state, action) => {
      state.filter.tempRange = action.payload;
    },
  },
});

export const { setTheme, setLoading, setError, clearError, toggleUnits, setWeatherTypeFilter, setTempRangeFilter } = uiSlice.actions;
export default uiSlice.reducer;
