import { render, screen } from '@testing-library/react';
import { MemoryRouter} from 'react-router';
import { AuthRoutes } from '@/auth/routes/AuthRoutes';
import { AppRoutes } from '@/globals/routes';



jest.mock('@/auth/pages/LoginPage', () => ({
  LoginPage: () => <div data-testid="mocked-login-page">Mocked LoginPage</div>,
}));

jest.mock('@/auth/pages/RegisterPage', () => ({
  RegisterPage: () => <div data-testid="mocked-register-page">Mocked RegisterPage</div>,
}));


test('should render LoginPage for login route', () => {
  render(
    <MemoryRouter initialEntries={[`/${AppRoutes.login}`]}>
      <AuthRoutes />
    </MemoryRouter>
  );

  expect(screen.getByTestId('mocked-login-page')).toBeInTheDocument();
});

test('should render RegisterPage for register route', () => {
  render(
    <MemoryRouter initialEntries={[`/${AppRoutes.register}`]}>
      <AuthRoutes />
    </MemoryRouter>
  );

  expect(screen.getByTestId('mocked-register-page')).toBeInTheDocument();
});
