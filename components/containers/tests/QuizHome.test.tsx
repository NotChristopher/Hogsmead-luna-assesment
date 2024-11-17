// __tests__/QuizScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import QuizHome from '../QuizHome';
import {Questions} from '../../mockData/Questions';

describe('QuizScreen', () => {
  it('renders the first question and answers correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <QuizHome />
      </Provider>
    );

    expect(getByText(Questions[0].question)).toBeTruthy();

      Questions[0].answers.forEach(answer => {
      expect(getByText(answer.answer)).toBeTruthy();
    });
  });

  it('allows the user to select an answer and moves to the next question', () => {
    const { getByText } = render(
      <Provider store={store}>
        <QuizHome />
      </Provider>
    );

    fireEvent.press(getByText(Questions[0].answers[0].answer));

    const state = store.getState();
    expect(state.quiz.traitCount.Courage).toBe(1);

    expect(getByText(Questions[1].question)).toBeTruthy();
  });

  it('shows the result at the end of the quiz based on majority trait', async () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <QuizHome />
      </Provider>
    );

    for (let i = 0; i < Questions.length; i++) {
        const selectedAnswer = Questions[i].answers[0].answer;
        if(i){
            fireEvent.press(getByText(selectedAnswer)); }
    }

    await waitFor(() => {
      expect(getByText('See Results')).toBeTruthy();
    });

    fireEvent.press(getByText('See Results'));
    expect(getByText('Gryffindor')).toBeTruthy();
  });

});
