import { configureStore, Dispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { LoginPage } from '@/auth/pages/LoginPage';
import { authSlice, AuthStatus } from '@/store/auth/authSlice';
import { journalSlice } from '@/store/journal/journalSlice';
import { MemoryRouter } from 'react-router';

jest.mock('@/store/auth/authThunks', () => ({
  startGoogleLogin: jest.fn().mockReturnValue((dispatch: Dispatch) => {
    dispatch({ type: 'auth/googleLoginSuccess' });
  }),
  startLoginWithEmail: jest.fn().mockReturnValue((dispatch: Dispatch) => {
    dispatch({ type: 'auth/googleLoginSuccess' });
  })
}));

const mockStartGoogleLogin = require('@/store/auth/authThunks').startGoogleLogin;
const startLoginWithEmail = require('@/store/auth/authThunks').startLoginWithEmail;


const mockStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
  preloadedState: {
    auth: { user: null, status: AuthStatus.NOT_AUTHENTICATED },
    journal: {
      isSaving: false,
      messageSaved: '',
      notes: [],
      active: null,
    },
  },
});

describe('LoginPage.test.tsx', () => {
  test('should render component correctly', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('Google button should call startGoogleLogin', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleButton = screen.getByLabelText('google-sign-in');
    fireEvent.click(googleButton);
    expect(mockStartGoogleLogin).toHaveBeenCalled();
  });


  test('Submit should call start login with email and password', () => {
    const email = 'mail@mail.com';
    const password = '12345';
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', {name: 'email'});
    fireEvent.change(emailField, {target: {email: email}});
    const passwordField = screen.getByLabelText('password-input');
    fireEvent.change(passwordField, {target: {password: password}});
    const form = screen.getByRole('form');
    fireEvent.submit(form)
    expect(startLoginWithEmail).toHaveBeenCalled()
  });
});
