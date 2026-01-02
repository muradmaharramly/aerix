import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherForecast } from '../services/api';
import { setLoading, setError } from './uiSlice';

// Async thunk to fetch all weather data
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (location, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      
      // Fetch only forecast (includes hourly which serves as current)
      const forecast = await fetchWeatherForecast(location);

      dispatch(setLoading(false));
      return { forecast };
    } catch (error) {
      dispatch(setLoading(false));
      const errorMsg = error.message || 'Failed to fetch weather data';
      
      // Handle Rate Limit specifically
      if (errorMsg.includes('429') || errorMsg.toLowerCase().includes('limit')) {
         dispatch(setError('Rate limit reached. Please wait a moment.'));
      } else {
         dispatch(setError(errorMsg));
      }
      
      return rejectWithValue(errorMsg);
    }
  }
);

const initialState = {
  current: null,
  forecast: [], // Array of daily forecasts
  hourly: [], // Array of hourly forecasts
  locationCoords: null, // { lat, lon }
  lastUpdated: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        // Use the first hourly forecast as current weather
        const firstHour = action.payload.forecast.timelines?.hourly?.[0];
        if (firstHour) {
          state.current = { data: { values: firstHour.values } };
        }
        
        // Transform forecast data structure
        state.forecast = action.payload.forecast.timelines?.daily || []; 
        state.hourly = action.payload.forecast.timelines?.hourly || [];
        state.locationCoords = action.payload.forecast.location ? {
           lat: action.payload.forecast.location.lat,
           lon: action.payload.forecast.location.lon
        } : null;
        state.lastUpdated = new Date().toISOString();
      });
  },
});

export default weatherSlice.reducer;
