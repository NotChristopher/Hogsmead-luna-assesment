import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SinglePotion from '../SinglePotion'; // adjust path if needed

// Mocking the redux store and initial state
const mockPotion = {
  name: 'Polyjuice Potion',
  effect: 'Allows the drinker to assume the form of someone else.',
  difficulty: 'Very Difficult',
  characteristics: 'Requires a hair or other body part of the person to be impersonated.',
  ingredients: [
    { name: 'Lacewing fly' },
    { name: 'Leeches' },
    { name: 'Powdered Bicorn Horn' },
  ],
};

const mockStore = configureStore({
  reducer: {
    elixirs: (state = { potion: mockPotion }) => state,
  },
});

describe('SinglePotion Component', () => {
  it('renders potion details correctly', () => {
    render(
      <Provider store={mockStore}>
        <SinglePotion />
      </Provider>
    );

    // Check if the potion name is rendered
    expect(screen.getByText('Polyjuice Potion')).toBeTruthy();

    // Check if the effect is rendered
    expect(screen.getByText(/Allows the drinker to assume the form of someone else/)).toBeTruthy();

    // Check if the difficulty is rendered
    expect(screen.getByText(/Difficulty : Very Difficult/)).toBeTruthy();

    // Check if characteristics is rendered
    expect(screen.getByText(/Characteristics : Requires a hair or other body part of the person to be impersonated/)).toBeTruthy();

    // Check if ingredients are rendered
    expect(screen.getByText('Ingredients')).toBeTruthy();
    expect(screen.getByText('Lacewing fly')).toBeTruthy();
    expect(screen.getByText('Leeches')).toBeTruthy();
    expect(screen.getByText('Powdered Bicorn Horn')).toBeTruthy();
  });

  it('renders "unknown" if no effect is provided', () => {
    // Modify the mock state to have no effect
    const mockPotionWithNoEffect = { ...mockPotion, effect: '' };

    const storeWithNoEffect = configureStore({
      reducer: {
        elixirs: (state = { potion: mockPotionWithNoEffect }) => state,
      },
    });

    render(
      <Provider store={storeWithNoEffect}>
        <SinglePotion />
      </Provider>
    );

    // Check if the effect is rendered as "unknown"
    expect(screen.getByText(/Effeft : unknown/)).toBeTruthy();
  });

  it('renders "unknown" if no ingredients are provided', () => {
    // Modify the mock state to have no ingredients
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

    // Check if the ingredients section renders "unknown"
    expect(screen.getByText('unknown')).toBeTruthy();
  });

  it('renders ShareButton', () => {
    render(
      <Provider store={mockStore}>
        <SinglePotion />
      </Provider>
    );

    // Check if the ShareButton is rendered
    expect(screen.getByType('ShareButton')).toBeTruthy();
  });
});
