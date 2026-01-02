import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: 'New York', // Default city
  coordinates: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
      state.coordinates = null; // Reset coordinates if city is set
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
      state.city = null; // Reset city if coordinates are used
    },
  },
});

export const { setCity, setCoordinates } = locationSlice.actions;
export default locationSlice.reducer;
