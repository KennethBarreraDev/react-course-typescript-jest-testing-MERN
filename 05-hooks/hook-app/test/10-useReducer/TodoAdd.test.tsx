import { TodoAdd } from '@/10-useReducer/TodoAdd';
import { fireEvent, render, screen } from '@testing-library/react';

describe('TodoAdd.test.tsx', () => {
    const onInputChange = jest.fn();
    const handleNewTodo = jest.fn();
    const inputValue = 'Default todo';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should render the component correctly', () => {
        render(<TodoAdd onInputChange={onInputChange} handleNewTodo={handleNewTodo} inputValue={inputValue} />);
        expect(screen.getByText('Create todo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Insert your todo')).toBeInTheDocument();
    });

    test('Should call onInputChange when input value changes', () => {
        render(<TodoAdd onInputChange={onInputChange} handleNewTodo={handleNewTodo} inputValue={inputValue} />);
        
        const inputElement = screen.getByPlaceholderText('Insert your todo');
        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        expect(onInputChange).toHaveBeenCalledTimes(1);
    });

    test('Should call handleNewTodo when form is submitted', () => {
        render(<TodoAdd onInputChange={onInputChange} handleNewTodo={handleNewTodo} inputValue={inputValue} />);
        
        const formElement = screen.getByRole('form');
        fireEvent.submit(formElement);
        expect(handleNewTodo).toHaveBeenCalledTimes(1);
        expect(handleNewTodo).toHaveBeenCalledWith(expect.any(Object));
    });
});
