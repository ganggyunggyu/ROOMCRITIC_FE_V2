import { createSlice } from '@reduxjs/toolkit';

import { TUserInfo } from '../../types/main';

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
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setClearAuth: (state) => {
      state.userInfo = null;
      state.isLoggedIn = null;
    },
  },
});

export const { setIsLoggedIn, setUserInfo, setClearAuth } = userSlice.actions;

export default userSlice.reducer;
