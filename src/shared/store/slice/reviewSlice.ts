import { createSlice } from '@reduxjs/toolkit';
import { TReview } from '../../types/main';

interface ReviewState {
  reviews: TReview[];
  selectedReview: TReview | null;
}

const initialState: ReviewState = {
  reviews: [],
  selectedReview: null,
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setSelectedReview: (state, action) => {
      state.selectedReview = action.payload;
    },
  },
});

export const { setReviews, setSelectedReview } = reviewSlice.actions;

export default reviewSlice.reducer;
