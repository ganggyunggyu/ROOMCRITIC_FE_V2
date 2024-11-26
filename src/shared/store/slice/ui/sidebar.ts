import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type sidebarSliceProps = {
  isRightSideBar: boolean;
};

const initialState: sidebarSliceProps = {
  isRightSideBar: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIsRightSideBar: (state, action: PayloadAction<boolean>) => {
      state.isRightSideBar = action.payload;
    },
  },
});

export const { setIsRightSideBar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
