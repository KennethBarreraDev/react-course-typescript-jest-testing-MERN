import { CallBackHook } from '@/08-useCallback/CallBackHook';
import { render, screen, fireEvent } from '@testing-library/react';

describe('CallBackHook.test.tsx', () => {
  test('Should render correctly and display initial counter value', () => {
    render(<CallBackHook />);
    expect(screen.getByText('Use callback hook: 10')).toBeInTheDocument();
  });

  test('Should call increment function passed to ShowIncrement when clicked', () => {
    render(<CallBackHook />);
    const incrementButton = screen.getByText('Increment');
    fireEvent.click(incrementButton);
    expect(screen.getByText('Use callback hook: 12')).toBeInTheDocument();
  });
});
