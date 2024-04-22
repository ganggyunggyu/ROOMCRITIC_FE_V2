import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const isLoggedInState = atom({
  key: 'inLoggedInState',
  default: false,
});
export const userInfoState = atom({
  key: 'userInfoState',
  default: { _id: '', displayName: '', phoneNumber: '', email: '' },
});
export const searchContentsState = atom({
  key: 'searchContentsState',
  default: [],
});
export const reviewsState = atom({
  key: 'reviewsState',
  default: [],
});
export const selectReviewState = atom({
  key: 'selectReviewState',
  default: {},
});
export const isDarkModeState = atom({
  key: 'isDarkModeState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
export const darkModeClassesState = atom({
  key: 'darkModeClassesState',
  default: '',
});
