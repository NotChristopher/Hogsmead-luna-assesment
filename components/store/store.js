import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slices/quizSlice';
import elixirsReducer from './slices/elixirsSlice';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    elixirs : elixirsReducer,
  },
});
