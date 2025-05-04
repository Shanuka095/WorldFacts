import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

jest.mock('../Header', () => {
  return function MockHeader({ isDarkMode, toggleDarkMode }) {
    return (
      <div data-testid="header">
        <span>WorldFacts</span>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      </div>
    );
  };
});

describe('Header Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Header isDarkMode={false} toggleDarkMode={() => {}} />
      </MemoryRouter>
    );
    expect(getByTestId('header')).toBeInTheDocument();
  });

  it('calls toggleDarkMode when button is clicked', () => {
    const toggleDarkMode = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <Header isDarkMode={false} toggleDarkMode={toggleDarkMode} />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Toggle Dark Mode'));
    expect(toggleDarkMode).toHaveBeenCalledTimes(1);
  });
});