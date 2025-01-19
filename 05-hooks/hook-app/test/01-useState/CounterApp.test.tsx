import { CounterApp } from "@/01-useState/CounterApp";
import { fireEvent, render, screen } from "@testing-library/react";


describe('CounterApp.test.tsx', () => {

    const initialState = {
        counter1: 10,
        counter2: 20,
        counter3: 30
    }

    test('Should set initial values in h1 tags', () => {
        render(<CounterApp />)
        expect(screen.getByText(`Counter1: ${initialState.counter1}`)).toBeInTheDocument();
        expect(screen.getByText(`Counter2: ${initialState.counter2}`)).toBeInTheDocument();
        expect(screen.getByText(`Counter3: ${initialState.counter3}`)).toBeInTheDocument();
    })
    test('Should contain increment buttotns', () => {
        render(<CounterApp />)

        expect(screen.getByText('+1 counter 1')).toBeInTheDocument();
        expect(screen.getByText('+1 counter 2')).toBeInTheDocument();
        expect(screen.getByText('+1 counter 3')).toBeInTheDocument();
    })

    test('Should increment value on click counter buttons', () => {
        render(<CounterApp />)
        const counterButtons = screen.getAllByRole('button');
        fireEvent.click(counterButtons[0])
        fireEvent.click(counterButtons[1])
        fireEvent.click(counterButtons[2])
        
        expect(screen.getByText(`Counter1: ${initialState.counter1 + 1}`)).toBeInTheDocument();
        expect(screen.getByText(`Counter2: ${initialState.counter2 + 1}`)).toBeInTheDocument();
        expect(screen.getByText(`Counter3: ${initialState.counter3 + 1}`)).toBeInTheDocument();

    })
})