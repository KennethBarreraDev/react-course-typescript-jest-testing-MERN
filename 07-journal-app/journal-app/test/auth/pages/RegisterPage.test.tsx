import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterPage } from '@/auth/pages/RegisterPage';
import { authSlice, AuthStatus } from '@/store/auth/authSlice';
import { MemoryRouter } from 'react-router';

jest.mock('@/store/auth/authThunks', () => ({
  startUserRegister: jest.fn().mockReturnValue((dispatch: any) => {
    dispatch({ type: 'auth/registerSuccess' });
  }),
}));

const mockStartUserRegister = require('@/store/auth/authThunks').startUserRegister;

const mockStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: {
      user: null,
      status: AuthStatus.NOT_AUTHENTICATED,
      errorMessage: null,
    },
  },
});

describe('RegisterPage.test.tsx', () => {
  test('should render component correctly', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('register').length).toBeGreaterThanOrEqual(1);
  });

  test('Submit should call startUserRegister with valid form data', () => {
    const fullName = 'kenneth';
    const email = 'kenneth@mail.com';
    const password = '123456';

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    const fullNameField = screen.getByLabelText('Full name');
    fireEvent.change(fullNameField, { target: { value: fullName } });

    const emailField = screen.getByLabelText('email');
    fireEvent.change(emailField, { target: { value: email } });

    const passwordField = screen.getByLabelText('password');
    fireEvent.change(passwordField, { target: { value: password } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockStartUserRegister).toHaveBeenCalledWith(email, password, fullName);
  });

  test('should show error message when an error occurs', () => {
    const errorStore = configureStore({
      reducer: {
        auth: authSlice.reducer,
      },
      preloadedState: {
        auth: {
          user: null,
          status: AuthStatus.NOT_AUTHENTICATED,
          errorMessage: 'Registration failed',
        },
      },
    });

    render(
      <Provider store={errorStore}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Registration failed')).toBeInTheDocument();
  });

  test('Submit button should be disabled while checking status', () => {
    const checkingStore = configureStore({
      reducer: {
        auth: authSlice.reducer,
      },
      preloadedState: {
        auth: {
          user: null,
          status: AuthStatus.CHECKING,
          errorMessage: null,
        },
      },
    });

    render(
      <Provider store={checkingStore}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: 'register' });
    expect(submitButton).toBeDisabled();
  });
});
