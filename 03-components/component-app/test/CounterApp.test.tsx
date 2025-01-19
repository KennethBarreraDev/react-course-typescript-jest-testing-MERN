import { fireEvent, render, screen } from "@testing-library/react";
import { CounterApp } from "../src/CounterApp"; // Importa tu componente correctamente

describe("Counter app", () => {
    const defaultValue = 100;

    test("Should match snapshot", () => {
        render(<CounterApp value={defaultValue} />)
        expect(screen).toMatchSnapshot()
    });

    test("Should contain value in a h2 tag", () => {
        render(<CounterApp value={defaultValue} />)
        expect(screen.getByRole('heading',{level: 2}).innerHTML).toContain(defaultValue.toString())
    });

    test('Should increment with +1 button', ()=>{
        render(<CounterApp value={defaultValue} />)
        const actionButtons =screen.getByText('+1');
        fireEvent.click(actionButtons)
        expect(screen.getByRole('heading', {level: 2}).innerHTML).toContain((defaultValue+1).toString())
    })


    test('Should decrement with -1 button', ()=>{
        render(<CounterApp value={defaultValue} />)
        const decrementButton = screen.getByTestId('decrement-button')
        fireEvent.click(decrementButton)
        expect(screen.getByRole('heading', {level: 2}).innerHTML).toContain((defaultValue-1).toString())
    })


    
    test('Should decrement with -1 button', ()=>{
        render(<CounterApp value={defaultValue} />)
        const resetButton = screen.getByRole('button', {name: 'btn-reset'})
        fireEvent.click(resetButton)
        expect(screen.getByRole('heading', {level: 2}).innerHTML).toContain((defaultValue).toString())
    })



});
