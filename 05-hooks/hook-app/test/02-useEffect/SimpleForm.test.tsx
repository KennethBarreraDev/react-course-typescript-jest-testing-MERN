import { SimpleForm } from "@/02-useEffect/SimpleForm";
import { render, screen, fireEvent } from '@testing-library/react';


describe('SimpleForm.test.tsx', () => {
    const newUser = 'user1'
    const newEmail = 'email@mail.com';

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    test('Should render initial values correctly', () => {
        render(<SimpleForm />);
        expect(screen.getByPlaceholderText('username')).toHaveValue('kenneth');
        expect(screen.getByPlaceholderText('email')).toHaveValue('kenneth@mail.com');
        expect(screen.queryByText('Message')).toBeNull();
    });

    test('Should update username on input change', () => {
        render(<SimpleForm />);
        const usernameInput = screen.getByPlaceholderText('username');
        expect(usernameInput).toBeInTheDocument()
        fireEvent.change(usernameInput, { target: { value: newUser } });
        expect(usernameInput).toHaveValue(newUser);
    });


    test('Should update email on input change', () => {
      
        render(<SimpleForm />)
        const emailInput = screen.getByPlaceholderText('email');
        expect(emailInput).toBeInTheDocument()
        fireEvent.change(emailInput, { target: { value: newEmail } })
        expect(emailInput).toHaveValue(newEmail)
    })

    test('Should render the Message component on special username', () => {
        render(<SimpleForm />);
        const usernameInput = screen.getByPlaceholderText('username');
        fireEvent.change(usernameInput, { target: { value: 'qubit' } });
        expect(screen.getByText('Username already in use')).toBeInTheDocument();
    });


    test('Should not render message when special username is not written', () => {
        render(<SimpleForm />);
        const usernameInput = screen.getByPlaceholderText('username');
        fireEvent.change(usernameInput, { target: { value: 'qubit1' } });
        expect(screen.queryByText('Username already in use')).toBeNull();
    });

    test('calls effects on username and email changes', () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        render(<SimpleForm />);
        const usernameInput = screen.getByPlaceholderText('username');
        const emailInput = screen.getByPlaceholderText('email');

        fireEvent.change(usernameInput, { target: { value: newUser } });
        expect(consoleLogSpy).toHaveBeenCalledWith('Username has changed');

        fireEvent.change(emailInput, { target: { value: newEmail } });
        expect(consoleLogSpy).toHaveBeenCalledWith('Email has changed');
        consoleLogSpy.mockRestore()

    });

})