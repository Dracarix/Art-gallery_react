import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ImagesState {
  loadedImages: number[];
  loadingAttempts: Record<number, number>;
}
const initialState: ImagesState = {
  loadedImages: [],
  loadingAttempts: {},
};
const ArtApi = createSlice({
  name: 'images',
  initialState,
  reducers: {
    imageLoaded: (state, action: PayloadAction<number>) => {
      state.loadedImages.push(action.payload);
    },
    imageError: (state, action: PayloadAction<number>) => {
      const value = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loadingAttempts[value] = (state.loadingAttempts[value] || 0) + 1;
    },
  },
});

export const { imageLoaded, imageError } = ArtApi.actions;
export const selectImages = (state: { images: ImagesState }) => state.images;

export default ArtApi.reducer;
