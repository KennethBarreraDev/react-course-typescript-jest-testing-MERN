import { FocusScreen } from '@/04-useRef/FocusScreen';
import { render, screen } from '@testing-library/react';

describe('FocusScreen Component', () => {
  test('Should render FocusScreen component', () => {
    render(<FocusScreen />);
    expect(screen.getByText('Focus screen')).toBeInTheDocument();
    expect(screen.getByText('Set focus')).toBeInTheDocument();
  });
});
