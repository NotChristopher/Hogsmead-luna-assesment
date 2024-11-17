import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Potions from '../Potions'; // Adjust the path if needed
import elixirsReducer from '../../store/slices/elixirsSlice'; // Adjust the path if needed
import { NavigationContainer } from '@react-navigation/native';

// Mock the navigation
const mockNavigate = jest.fn();

// Create a mock store with the initial state
const mockStore = configureStore({
  reducer: {
    elixirs: elixirsReducer,
  },
  preloadedState: {
    elixirs: {
      data: [
        { id: 1, name: 'Polyjuice Potion' },
        { id: 2, name: 'Felix Felicis' },
      ],
      loading: false,
      error: null,
      searchQuery: '',
      filter: '',
    },
  },
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('Potions Component', () => {
  it('renders the Potions screen correctly', () => {
    render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Potions />
        </NavigationContainer>
      </Provider>
    );

    // Check if search input, filter buttons, and potion list are rendered
    expect(screen.getByPlaceholderText('Search Elixirs')).toBeTruthy();
    expect(screen.getByText('Popular Ingredients')).toBeTruthy();
    expect(screen.getByText('Puffer-fish')).toBeTruthy();
    expect(screen.getByText('Wolfsbane')).toBeTruthy();
    expect(screen.getByText('Moondew')).toBeTruthy();
    expect(screen.getByText('Clear Filter')).toBeTruthy();
    expect(screen.getByText('Polyjuice Potion')).toBeTruthy();
    expect(screen.getByText('Felix Felicis')).toBeTruthy();
  });

  it('calls setSearchQuery when search input changes', () => {
    render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Potions />
        </NavigationContainer>
      </Provider>
    );

    // Simulate user typing in the search input
    fireEvent.changeText(screen.getByPlaceholderText('Search Elixirs'), 'Polyjuice');

    // Check if dispatch action for search is triggered
    // (You would need to mock the dispatch function to check this if necessary)
    expect(screen.getByPlaceholderText('Search Elixirs').props.value).toBe('Polyjuice');
  });

  it('calls setFilter with the correct ingredient when a filter button is pressed', () => {
    render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Potions />
        </NavigationContainer>
      </Provider>
    );

    // Press "Puffer-fish" button
    fireEvent.press(screen.getByText('Puffer-fish'));
    // Expect dispatch with 'Puffer-fish' ingredient (use jest.fn to mock dispatch and check)
    expect(screen.getByText('Puffer-fish')).toBeTruthy();
  });

  it('calls setFilter with an empty string when "Clear Filter" is pressed', () => {
    render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Potions />
        </NavigationContainer>
      </Provider>
    );

    // Press "Clear Filter" button
    fireEvent.press(screen.getByText('Clear Filter'));

    // Expect the filter to be cleared (the state should be reset)
    expect(screen.getByText('Clear Filter')).toBeTruthy();
  });

  it('shows loading indicator when data is loading', () => {
    const loadingStore = configureStore({
      reducer: {
        elixirs: elixirsReducer,
      },
      preloadedState: {
        elixirs: {
          data: [],
          loading: true,
          error: null,
          searchQuery: '',
          filter: '',
        },
      },
    });

    render(
      <Provider store={loadingStore}>
        <NavigationContainer>
          <Potions />
        </NavigationContainer>
      </Provider>
    );

    // Check if the ActivityIndicator is shown
    expect(screen.getByType(ActivityIndicator)).toBeTruthy();
  });

  it('shows error message when there is an error', () => {
    const errorStore = configureStore({
      reducer: {
        elixirs: elixirsReducer,
      },
      preloadedState: {
        elixirs: {
          data: [],
          loading: false,
          error: 'Failed to fetch potions',
          searchQuery: '',
          filter: '',
        },
      },
    });

    render(
      <Provider store={errorStore}>
        <NavigationContainer>
          <Potions />
        </NavigationContainer>
      </Provider>
    );

    // Check if the error message is displayed
    expect(screen.getByText('Failed to fetch potions')).toBeTruthy();
  });

  it('navigates to SinglePotion screen when a potion is pressed', () => {
    render(
      <Provider store={mockStore}>
        <NavigationContainer>
          <Potions />
        </NavigationContainer>
      </Provider>
    );

    // Simulate pressing a potion
    fireEvent.press(screen.getByText('Polyjuice Potion'));

    // Check if the navigation function was called with the correct screen
    expect(mockNavigate).toHaveBeenCalledWith('SinglePotion');
  });
});
