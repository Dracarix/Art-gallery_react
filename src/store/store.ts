import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../components/Theme/slice';
import ArtApi from './art-load/ArtApi.slise';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    images: ArtApi,
  },
});
