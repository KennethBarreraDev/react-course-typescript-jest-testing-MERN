import { render, screen, fireEvent } from '@testing-library/react';
import { AddCategory } from '../../src/components/AddCategory';

describe('AddCategory.test', () => {
    const onAddCategory = jest.fn();
    const category = 'cats';

    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    test('Should change text in input', () => {
        render(<AddCategory onAddCategory={onAddCategory} />);
        const input = screen.getByRole('textbox', { name: 'find-gifs-input' }) as HTMLInputElement;
        fireEvent.change(input, { target: { value: category } });
        expect(input.value).toBe(category);
    });

    test('Should call onAddCategory on form submit', () => {
        render(<AddCategory onAddCategory={onAddCategory} />);
        const form = screen.getByRole('form', { name: 'gif-finder' });
        const input = screen.getByRole('textbox', { name: 'find-gifs-input' });

        fireEvent.change(input, { target: { value: category } });
        fireEvent.submit(form);

        expect(onAddCategory).toHaveBeenCalledTimes(1);
        expect(onAddCategory).toHaveBeenCalledWith(category);
    });


    test('Should NOT call onAddCategory on form submit with empty value', () => {
        render(<AddCategory onAddCategory={onAddCategory} />);
        const form = screen.getByRole('form', { name: 'gif-finder' });
        const input = screen.getByRole('textbox', { name: 'find-gifs-input' });

        fireEvent.change(input, { target: { value: '' } });
        fireEvent.submit(form);

        expect(onAddCategory).toHaveBeenCalledTimes(0);
    });


});
