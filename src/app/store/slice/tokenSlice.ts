import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type tokenProps = {
  accessToken: string | null;
};

const initialState: tokenProps = {
  accessToken: null,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setClearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, setClearAccessToken } = tokenSlice.actions;

export default tokenSlice.reducer;
