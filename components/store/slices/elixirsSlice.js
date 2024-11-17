// src/features/elixirsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchElixirs = createAsyncThunk(
    'elixirs/fetchElixirs',
    async ({searchQuery,filter }) => {
      let url = 'https://wizard-world-api.herokuapp.com/Elixirs?';

      if (searchQuery) {
        // Because of Api search structure I need to capitilise each word
        let validSearch = searchQuery
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
        url += `name=${validSearch}&`;
      }

      if (filter) {
        url += `Ingredient=${filter}&`;
      }

      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
  );


const elixirsSlice = createSlice({
  name: 'elixirs',
  initialState: {
    data: [],
    loading: false,
    error: null,
    potion: {},
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload; //This does nothing now, I wanted to paginate but currenlty i don't have time
    },
    setActivePotion : (state, action) => {
        state.potion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchElixirs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchElixirs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchElixirs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, setFilter, setPage, setActivePotion } = elixirsSlice.actions;

export default elixirsSlice.reducer;
