import { render, screen } from '@testing-library/react';
   import { MemoryRouter } from 'react-router-dom';
   import CountryCard from '../CountryCard.jsx';

   test('renders country card and link', () => {
     const country = {
       name: { common: 'France' },
       flags: { png: 'france.png' },
       population: 67391582,
       region: 'Europe',
       capital: ['Paris']
     };

     render(
       <MemoryRouter>
         <CountryCard country={country} />
       </MemoryRouter>
     );

     expect(screen.getByText('France')).toBeInTheDocument();
     expect(screen.getByText('Capital: Paris')).toBeInTheDocument();
     expect(screen.getByText('Population: 67,391,582')).toBeInTheDocument();
     expect(screen.getByText('Region: Europe')).toBeInTheDocument();
     expect(screen.getByRole('img', { name: /france/i })).toHaveAttribute('src', 'france.png');
     expect(screen.getByRole('link', { name: /view details/i })).toHaveAttribute('href', '/country/France');
   });