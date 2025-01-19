import { Parent } from '@/09-memo-homework/Parent';
import { render, screen } from '@testing-library/react';

// Mock de la consola para evitar log de renderización en los componentes
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Parent Component', () => {
  test('Should render correctly with initial state', () => {
    render(<Parent />);
    expect(screen.getByText('Parent')).toBeInTheDocument();
    expect(screen.getByText('Total: 0')).toBeInTheDocument();
  });
});


