import { ShowIncrement } from '@/08-useCallback/ShowIncrement';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ShowIncrement.tstt.tsx', () => {
  test('Should render correctly', () => {
    render(<ShowIncrement increment={() => {}} />);
    expect(screen.getByText('Increment')).toBeInTheDocument();
  });

  test('Should call increment with correct value when button is clicked', () => {
    const increment = jest.fn();
    render(<ShowIncrement increment={increment} />);
    
    const incrementButton = screen.getByText('Increment');
    
    fireEvent.click(incrementButton);
    
    expect(increment).toHaveBeenCalledWith(2);
  });

  
});
