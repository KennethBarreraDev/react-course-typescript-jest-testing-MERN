import { Memorize } from '@/06-memo/Memorize';
import { render, screen, fireEvent } from '@testing-library/react';


describe('Memorize.test.tsx', () => {
  test('Should render component correctly', () => {
    render(<Memorize />);
    expect(screen.getByText('Counter:')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.getByText(/Show\/Hide/)).toBeInTheDocument();
  });

  test('Should increment counter when clicking +1 button', () => {
    render(<Memorize />);
    const incrementButton = screen.getByText('+1');
    const counterText = screen.getByTestId('counter-test');

    expect(counterText.innerHTML).toBe('0')
    expect(counterText).toBeInTheDocument();
    fireEvent.click(incrementButton);
    expect(counterText.innerHTML).toBe('1')
  });

});
