import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DarkModeState {
  isDarkMode: boolean;
  darkModeClasses: string;
}

const initialState: DarkModeState = {
  isDarkMode: false,
  darkModeClasses: '',
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    // setDarkMode: (state) => {
    //   state.isDarkMode = !state.isDarkMode;
    // },
    setDarkModeClasses: (state, action: PayloadAction<string>) => {
      state.darkModeClasses = action.payload;
      // if (state.isDarkMode) state.darkModeClasses = 'bg-white text-black';
      // if (!state.isDarkMode) state.darkModeClasses = 'bg-zinc-800 text-white';
    },
  },
});

export const { setDarkMode, setDarkModeClasses } = darkModeSlice.actions;

export default darkModeSlice.reducer;