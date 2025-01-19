import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginPage } from '@/auth/pages/LoginPage';
import { useAuthStore } from '@/globals/hooks/useAuthStore';
import { useCustomForm } from '@/globals/hooks/useCustomForm';
import { USER_STATUS } from '@/store/auth/authSlice';
import Swal from 'sweetalert2';

jest.mock('@/globals/hooks/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('@/globals/hooks/useCustomForm', () => ({
  useCustomForm: jest.fn(),
}));

jest.mock('sweetalert2');

describe('LoginPage', () => {
  let mockStartLogin: jest.Mock;
  let mockStartCreatingUser: jest.Mock;

  beforeEach(() => {
    mockStartLogin = jest.fn();
    mockStartCreatingUser = jest.fn();
    (useAuthStore as jest.Mock).mockReturnValue({
      errorMessage: '',
      successMesage: '',
      startCreatingUser: mockStartCreatingUser,
      startLogin: mockStartLogin,
      status: USER_STATUS.CHECKING,
    });

    (useCustomForm as jest.MockedFunction<typeof useCustomForm>).mockReturnValue({
      formState: {
        loginEmail: '',
        loginPassword: '',
        userName: '',
        registerEmail: '',
        registerPassword: '',
        registerPassword2: '',
      },
      onInputChange: jest.fn(),
      onResetForm: jest.fn(),
      validateFormSubmit: jest.fn(),
      errors: {},
    });
  });

  test('should render login and register forms', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });

  test('should call startLogin on login form submit', async () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText('loginEmail') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('loginPassword') as HTMLInputElement;
    const submitButton = screen.getByLabelText('login-button') as HTMLButtonElement;
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(mockStartLogin).toHaveBeenCalled();
    });
  });
  
  
  test('should call startCreatingUser on register form submit', async () => {
    render(<LoginPage />);

    const nameInput = screen.getByLabelText('userName') as HTMLInputElement;
    const emailInput = screen.getByLabelText('registerEmail') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('registerPassword') as HTMLInputElement;
    const repeatPasswordInput = screen.getByLabelText('registerPassword2') as HTMLInputElement;
    const submitButton = screen.getByLabelText('register-button') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockStartCreatingUser).toHaveBeenCalled();
    });
  });

  test('should show error message when errorMessage is set', () => {
    (useAuthStore as jest.Mock).mockReturnValueOnce({
      errorMessage: 'Error creating user',
      successMesage: '',
      startCreatingUser: mockStartCreatingUser,
      startLogin: mockStartLogin,
      status: USER_STATUS.CHECKING,
    });

    render(<LoginPage />);
    expect(Swal.fire).toHaveBeenCalledWith('Auth error', 'Error creating user', 'error');
  });
});
