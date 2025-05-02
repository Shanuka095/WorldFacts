import { render, screen, fireEvent } from '@testing-library/react';
   import { MemoryRouter } from 'react-router-dom';
   import Register from '../Register.jsx';
   test('renders register form and submits', () => {
     render(<MemoryRouter><Register /></MemoryRouter>);
     expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
     expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
     expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
     expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
     fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
     fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
     fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
     fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass123' } });
     fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'pass123' } });
     fireEvent.click(screen.getByText('Register'));
   });