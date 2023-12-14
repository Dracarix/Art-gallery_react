import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../components/Theme/slice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
