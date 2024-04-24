import { createSlice } from '@reduxjs/toolkit';
import { TContent } from '../../types/main';

interface SearchState {
  searchContents: TContent[];
}

const initialState: SearchState = {
  searchContents: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchContents: (state, action) => {
      state.searchContents = action.payload;
    },
  },
});

export const { setSearchContents } = searchSlice.actions;

export default searchSlice.reducer;
