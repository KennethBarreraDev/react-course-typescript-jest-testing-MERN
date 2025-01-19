import { Child } from '@/09-memo-homework/Child';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Child Component', () => {
  test('Should render correctly', () => {
    render(<Child number={5} increment={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('Should call increment with the correct value when button is clicked', () => {
    const increment = jest.fn();
    render(<Child number={5} increment={increment} />);
    
    const button = screen.getByText('5');
    fireEvent.click(button);
    
    expect(increment).toHaveBeenCalledWith(5);
  });
});
