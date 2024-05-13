import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type accessTokenProps = {
  accessToken: string | null;
};

const initialState: accessTokenProps = {
  accessToken: null,
};

export const accessTokenSlice = createSlice({
  name: 'accessToken',
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

export const { setAccessToken, setClearAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
