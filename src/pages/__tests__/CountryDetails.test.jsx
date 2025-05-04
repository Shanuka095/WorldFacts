import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import CountryDetails from '../CountryDetails';
import * as api from '../../services/api';

jest.mock('../../services/api', () => ({
  getCountryByName: jest.fn()
}));

jest.mock('../CountryDetails', () => {
  return function MockCountryDetails({ isDarkMode, favorites, toggleFavorite }) {
    return <div data-testid="country-details">Country Details</div>;
  };
});

describe('CountryDetails Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/country/Dummy']}>
        <Route path="/country/:name">
          <CountryDetails isDarkMode={false} favorites={[]} toggleFavorite={() => {}} />
        </Route>
      </MemoryRouter>
    );
    expect(getByTestId('country-details')).toBeInTheDocument();
  });

  it('calls getCountryByName on mount', () => {
    render(
      <MemoryRouter initialEntries={['/country/Dummy']}>
        <Route path="/country/:name">
          <CountryDetails isDarkMode={false} favorites={[]} toggleFavorite={() => {}} />
        </Route>
      </MemoryRouter>
    );
    expect(api.getCountryByName).toHaveBeenCalledWith('Dummy');
  });
});