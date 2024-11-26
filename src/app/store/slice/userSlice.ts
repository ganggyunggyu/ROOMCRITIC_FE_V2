import { createSlice } from '@reduxjs/toolkit';

import { TUserInfo } from '../../../shared/types/main';

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
    setLoginStatus: (state, action) => {
      console.log(state);
      console.log(action);
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userInfo._id = action.payload._id;
      state.userInfo.email = action.payload.email;
      state.userInfo.displayName = action.payload.displayName;
    },
    setClearAuth: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setIsLoggedIn, setUserInfo, setClearAuth } = userSlice.actions;

export default userSlice.reducer;
