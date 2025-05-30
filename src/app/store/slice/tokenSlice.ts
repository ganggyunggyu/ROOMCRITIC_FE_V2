import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type tokenProps = {
  accessToken: string | null;
  refreshTokenExp: string | null;
};

const initialState: tokenProps = {
  accessToken: null,
  refreshTokenExp: null,
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
    setRefreshTokenExp: (state, action) => {
      state.refreshTokenExp = action.payload;
    },
  },
});

export const { setAccessToken, setClearAccessToken, setRefreshTokenExp } =
  tokenSlice.actions;

export default tokenSlice.reducer;
