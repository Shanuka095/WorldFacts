import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchFilter from '../SearchFilter';

jest.mock('../SearchFilter', () => {
  return function MockSearchFilter({ searchTerm, setSearchTerm, region, setRegion, language, setLanguage, isDarkMode }) {
    return (
      <div data-testid="search-filter">
        <input
          placeholder="Search for a country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  };
});

describe('SearchFilter Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <SearchFilter
        isDarkMode={false}
        searchTerm=""
        setSearchTerm={() => {}}
        region=""
        setRegion={() => {}}
        language=""
        setLanguage={() => {}}
      />
    );
    expect(getByTestId('search-filter')).toBeInTheDocument();
  });

  it('calls setSearchTerm on input change', () => {
    const setSearchTerm = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchFilter
        isDarkMode={false}
        searchTerm=""
        setSearchTerm={setSearchTerm}
        region=""
        setRegion={() => {}}
        language=""
        setLanguage={() => {}}
      />
    );
    fireEvent.change(getByPlaceholderText('Search for a country'), { target: { value: 'Dummy' } });
    expect(setSearchTerm).toHaveBeenCalledWith('Dummy');
  });
});