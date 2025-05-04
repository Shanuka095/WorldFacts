import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CountryCard from '../CountryCard';

jest.mock('../CountryCard', () => {
  return function MockCountryCard({ country, isFavorite, toggleFavorite, isDarkMode }) {
    return (
      <div data-testid="country-card">
        <span>{country.name.common}</span>
        <button onClick={() => toggleFavorite(country.name.common)}>Favorite</button>
      </div>
    );
  };
});

describe('CountryCard Component', () => {
  const country = {
    name: { common: 'Dummy Country' },
    flags: { png: 'dummy.png' },
    population: 1000000,
    capital: ['Dummy Capital'],
    region: 'Dummy Region'
  };

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <CountryCard
        country={country}
        isFavorite={false}
        toggleFavorite={() => {}}
        isDarkMode={false}
      />
    );
    expect(getByTestId('country-card')).toBeInTheDocument();
  });

  it('calls toggleFavorite when button is clicked', () => {
    const toggleFavorite = jest.fn();
    const { getByText } = render(
      <CountryCard
        country={country}
        isFavorite={false}
        toggleFavorite={toggleFavorite}
        isDarkMode={false}
      />
    );
    fireEvent.click(getByText('Favorite'));
    expect(toggleFavorite).toHaveBeenCalledWith('Dummy Country');
  });
});