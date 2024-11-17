import { createSlice } from '@reduxjs/toolkit';
import {Questions} from '../../mockData/Questions';

const initialState = {
  currentQuestionIndex: 0,
  answers: [],
  traitCount: {
    Courage: 0,
    Cunning: 0,
    Loyalty:0,
    Inteligence: 0,
  },
  house : '',
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    selectAnswer: (state, action) => {
      const {trait} = action.payload;
      const {house} = action.payload;
      state.house = house;
      state.answers.push(trait);
      state.traitCount[trait] += 1;
      if (state.currentQuestionIndex < Questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
  },
});

export const {selectAnswer} = quizSlice.actions;

export default quizSlice.reducer;