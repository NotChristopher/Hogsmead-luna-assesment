import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slices/quizSlice';
import houseReducer from './slices/houseSlice';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    house : houseReducer,
  },
});
