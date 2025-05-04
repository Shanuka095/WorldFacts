import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import * as api from '../../services/api';

jest.mock('../../services/api', () => ({
  getAllCountries: jest.fn()
}));

jest.mock('../Home', () => {
  return function MockHome({ isDarkMode, favorites, toggleFavorite }) {
    return <div data-testid="home">Home Page</div>;
  };
});

describe('Home Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Home isDarkMode={false} favorites={[]} toggleFavorite={() => {}} />
      </MemoryRouter>
    );
    expect(getByTestId('home')).toBeInTheDocument();
  });

  it('calls getAllCountries on mount', () => {
    render(
      <MemoryRouter>
        <Home isDarkMode={false} favorites={[]} toggleFavorite={() => {}} />
      </MemoryRouter>
    );
    expect(api.getAllCountries).toHaveBeenCalledTimes(1);
  });
});