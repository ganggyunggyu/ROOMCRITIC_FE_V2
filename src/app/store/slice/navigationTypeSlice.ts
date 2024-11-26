import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export type NavigationType = 'PUSH' | 'POP' | 'REPLACE';

type navigationTypeProps = {
  navigationType: 'PUSH' | 'POP' | 'REPLACE';
};

const initialState: navigationTypeProps = {
  navigationType: 'PUSH',
};

const navigationTypeSlice = createSlice({
  name: 'navigationType',
  initialState,
  reducers: {
    setNavigationType: (state, action: PayloadAction<NavigationType>) => {
      state.navigationType = action.payload;
    },
  },
});

export const { setNavigationType } = navigationTypeSlice.actions;

export default navigationTypeSlice.reducer;
