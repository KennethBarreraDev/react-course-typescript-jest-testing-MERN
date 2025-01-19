import { SmallCounter } from '@/06-memo/SmallCounter';
import { render, screen } from '@testing-library/react';

describe('SmallCounter.test.tsx', () => {
  test('Should render counter value correctly', () => {
    render(<SmallCounter counterValue={0} />);
    expect(screen.getByTestId('counter-test')).toHaveTextContent('0');
  });
});
