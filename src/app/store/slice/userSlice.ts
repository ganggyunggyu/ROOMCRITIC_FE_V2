import { createSlice } from '@reduxjs/toolkit';

export type TUserInfo = { _id: string; displayName: string; phoneNumber: string; email: string };

interface UserState {
  isLoggedIn: boolean;
  userInfo: TUserInfo | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userInfo: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setLoggedIn, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
