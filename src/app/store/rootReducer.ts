// src/app/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // 예시: 슬라이스 또는 리듀서 파일을 import

import reviewSlice from './slice/reviewSlice';
import darkModeSlice from './slice/darkModeSlice';
import searchSlice from './slice/searchSlice';
import userSlice from './slice/userSlice';

export const rootReducer = combineReducers({
  counter: counterReducer,
  darkMode: darkModeSlice,
  review: reviewSlice,
  search: searchSlice,
  user: userSlice,
});
