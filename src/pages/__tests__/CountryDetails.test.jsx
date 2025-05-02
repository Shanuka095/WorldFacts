import { render, screen, waitFor } from '@testing-library/react';
   import { MemoryRouter, Route, Routes } from 'react-router-dom';
   import CountryDetails from '../CountryDetails.jsx';
   import * as api from '../../services/api';

   jest.mock('../../services/api');

   test('renders country details', async () => {
     const mockCountry = {
       name: { common: 'France' },
       flags: { png: 'france.png' },
       population: 67391582,
       region: 'Europe',
       capital: ['Paris'],
       languages: { fra: 'French' }
     };
     api.getCountryByName.mockResolvedValue(mockCountry);

     render(
       <MemoryRouter initialEntries={['/country/France']}>
         <Routes>
           <Route path="/country/:name" element={<CountryDetails />} />
         </Routes>
       </MemoryRouter>
     );

     await waitFor(() => {
       expect(screen.getByText('France')).toBeInTheDocument();
       expect(screen.getByText('Capital: Paris')).toBeInTheDocument();
       expect(screen.getByText('Population: 67,391,582')).toBeInTheDocument();
       expect(screen.getByText('Region: Europe')).toBeInTheDocument();
       expect(screen.getByText('Languages: French')).toBeInTheDocument();
       expect(screen.getByRole('img', { name: /france/i })).toHaveAttribute('src', 'france.png');
       expect(screen.getByRole('link', { name: /back/i })).toHaveAttribute('href', '/');
     });
   });

   test('shows loading state', () => {
     api.getCountryByName.mockResolvedValue([]);
     render(
       <MemoryRouter initialEntries={['/country/France']}>
         <Routes>
           <Route path="/country/:name" element={<CountryDetails />} />
         </Routes>
       </MemoryRouter>
     );
     expect(screen.getByText('Loading...')).toBeInTheDocument();
     expect(screen.getByRole('status')).toHaveClass('animate-spin');
   });

   test('shows not found for invalid country', async () => {
     api.getCountryByName.mockResolvedValue(null);
     render(
       <MemoryRouter initialEntries={['/country/Invalid']}>
         <Routes>
           <Route path="/country/:name" element={<CountryDetails />} />
         </Routes>
       </MemoryRouter>
     );
     await waitFor(() => {
       expect(screen.getByText('Country not found.')).toBeInTheDocument();
     });
   });