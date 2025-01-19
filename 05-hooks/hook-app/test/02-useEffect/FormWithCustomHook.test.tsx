import { FormWithCustomHook } from '@/02-useEffect/FormWithCustomHook';
import { render, screen, fireEvent } from '@testing-library/react';


describe('SimpleForm.test.tsx', () => {
    const defaultUser = 'Kenneth'
    const defaultEmail = 'kenneth@mail.com';
    const defaultPassword = '123';

    const newUser = 'user1';
    const newEmail= 'user1';
    const newPassword = 'user1';


    test('Should render initial values correctly', () => {
        render(<FormWithCustomHook />);
        expect(screen.getByPlaceholderText('username')).toHaveValue(defaultUser);
        expect(screen.getByPlaceholderText('email')).toHaveValue(defaultEmail);
        expect(screen.getByPlaceholderText('password')).toHaveValue(defaultPassword);
    });

    test('Should update username on input change', () => {
        render(<FormWithCustomHook />);
        const usernameInput = screen.getByPlaceholderText('username');
        expect(usernameInput).toBeInTheDocument()
        fireEvent.change(usernameInput, { target: { value: newUser } });
        expect(usernameInput).toHaveValue(newUser);
    });


    test('Should update email on input change', () => {
      
        render(<FormWithCustomHook />)
        const emailInput = screen.getByPlaceholderText('email');
        expect(emailInput).toBeInTheDocument()
        fireEvent.change(emailInput, { target: { value: newEmail } })
        expect(emailInput).toHaveValue(newEmail)
    })

    test('Should update password on inputchange', ()=>{
        render(<FormWithCustomHook/>)
        const passwordInput = screen.getByPlaceholderText('password');
        fireEvent.change(passwordInput, {target: {value: newPassword}});
        expect(passwordInput).toHaveValue(newPassword)
    })

    test('Should reset form on button click', ()=>{
        render(<FormWithCustomHook/>)
        const resetFormButton = screen.getByRole('button');
        fireEvent.click(resetFormButton);
        expect(screen.getByPlaceholderText('username')).toHaveValue(defaultUser);
        expect(screen.getByPlaceholderText('email')).toHaveValue(defaultEmail);
        expect(screen.getByPlaceholderText('password')).toHaveValue(defaultPassword);
    })


})