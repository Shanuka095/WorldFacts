import { render, screen, fireEvent } from '@testing-library/react';
   import { MemoryRouter } from 'react-router-dom';
   import Login from '../Login.jsx';
   test('renders login form and submits', () => {
     render(<MemoryRouter><Login /></MemoryRouter>);
     expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
     fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
     fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpass' } });
     fireEvent.click(screen.getByText('Login'));
   });