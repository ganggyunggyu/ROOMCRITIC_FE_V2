import { combineReducers } from '@reduxjs/toolkit';

import reviewSlice from './slice/reviewSlice';
import darkModeSlice from './slice/darkModeSlice';
import searchSlice from './slice/searchSlice';
import userSlice from './slice/userSlice';
import prevPathhNameSlice from './slice/prevPathName';
import tokenSlice from './slice/tokenSlice';
import backgroundPathSlice from './slice/backgroundPath';
import navigationTypeSlice from './slice/navigationTypeSlice';
import sidebarSlice from './slice/ui/sidebar';

export const rootReducer = combineReducers({
  darkMode: darkModeSlice,
  review: reviewSlice,
  search: searchSlice,
  user: userSlice,
  prevPathName: prevPathhNameSlice,
  token: tokenSlice,
  backgroundPath: backgroundPathSlice,
  navigationType: navigationTypeSlice,
  sidebar: sidebarSlice,
});
