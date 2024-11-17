import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SinglePotion from '../SinglePotion';

const mockPotion = {
  name: 'Test Potion',
  effect: 'Allows the drinker to Test.',
  difficulty: 'Very Difficult',
  ingredients: [
    { name: 'Name1' },
    { name: 'name2' },
    { name: 'name3' },
  ],
};

const mockStore = configureStore({
  reducer: {
    elixirs: (state = { potion: mockPotion }) => state,
  },
});

describe('SinglePotion Test', () => {
  it('renders potion details', () => {
    render(
      <Provider store={mockStore}>
        <SinglePotion />
      </Provider>
    );

    expect(screen.getByText('Test Potion')).toBeTruthy();

    expect(screen.getByText('Allows the drinker to Test.')).toBeTruthy();

    expect(screen.getByText('Very Difficult')).toBeTruthy();

    expect(screen.getByText('Ingredients')).toBeTruthy();
    expect(screen.getByText('name1')).toBeTruthy();
    expect(screen.getByText('name2')).toBeTruthy();
    expect(screen.getByText('name3')).toBeTruthy();
  });


  it('renders "unknown" if no ingredients are provided', () => {
    const mockPotionWithNoIngredients = { ...mockPotion, ingredients: [] };

    const storeWithNoIngredients = configureStore({
      reducer: {
        elixirs: (state = { potion: mockPotionWithNoIngredients }) => state,
      },
    });

    render(
      <Provider store={storeWithNoIngredients}>
        <SinglePotion />
      </Provider>
    );

    expect(screen.getByText('unknown')).toBeTruthy();
  });
});
