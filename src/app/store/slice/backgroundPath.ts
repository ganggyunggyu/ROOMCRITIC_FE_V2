import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type backgroundPathProps = {
  backgroundPath: string | null;
};

const initialState: backgroundPathProps = {
  backgroundPath: null,
};

export const backgroundPathSlice = createSlice({
  name: 'backgroundPath',
  initialState,
  reducers: {
    setBackgroundPath: (state, action: PayloadAction<string>) => {
      state.backgroundPath = action.payload;
    },
  },
});

export const { setBackgroundPath } = backgroundPathSlice.actions;

export default backgroundPathSlice.reducer;
