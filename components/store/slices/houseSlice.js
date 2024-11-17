import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedImage: 'griffindor',
  house : '',
  houseLead : '',

};

const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    setHouseSlice: (state, action) => {
      state.selectedImage = action.payload;
      state.house = action.payload;
      state.houseLead = action.payload;
    },
  },
});

export const { setHouseSlice } = houseSlice.actions;
export default houseSlice.reducer;
