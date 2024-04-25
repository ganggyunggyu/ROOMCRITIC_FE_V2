// src/app/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';

import reviewSlice from './slice/reviewSlice';
import darkModeSlice from './slice/darkModeSlice';
import searchSlice from './slice/searchSlice';
import userSlice from './slice/userSlice';

export const rootReducer = combineReducers({
  darkMode: darkModeSlice,
  review: reviewSlice,
  search: searchSlice,
  user: userSlice,
});
