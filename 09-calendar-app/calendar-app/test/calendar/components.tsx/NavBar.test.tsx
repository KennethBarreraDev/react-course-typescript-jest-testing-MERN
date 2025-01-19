import { render, screen, fireEvent } from '@testing-library/react';
import { useAuthStore } from '@/globals/hooks/useAuthStore';
import { NavBar } from '@/calendar/components.tsx/NavBar';

jest.mock('@/globals/hooks/useAuthStore');

describe('NavBar', () => {
  const startLogOutMock = jest.fn();

  beforeEach(() => {
    (useAuthStore as jest.Mock).mockReturnValue({
      user: { username: 'Kenneth' },
      startLogOut: startLogOutMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should display the username in the navbar', () => {
    render(<NavBar />);
    expect(screen.getByText('Kenneth')).toBeInTheDocument();
  });

  test('should call startLogOut when the logout button is clicked', () => {
    render(<NavBar />);
    fireEvent.click(screen.getByRole('button'));
    expect(startLogOutMock).toHaveBeenCalled();
  });

  test('should render the correct logout button and icon', () => {
    render(<NavBar />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Salir');
    expect(button.querySelector('i')).toHaveClass('fas fa-sign-out-alt');
  });
});
