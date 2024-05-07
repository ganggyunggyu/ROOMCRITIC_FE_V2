import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type PrevPathNameProps = {
  prevPathName: string;
};

const initialState: PrevPathNameProps = {
  prevPathName: '/',
};

export const prevPathhNameSlice = createSlice({
  name: 'prevPathName',
  initialState,
  reducers: {
    setPrevPathName: (state, action: PayloadAction<string>) => {
      state.prevPathName = action.payload;
    },
  },
});

export const { setPrevPathName } = prevPathhNameSlice.actions;

export default prevPathhNameSlice.reducer;
