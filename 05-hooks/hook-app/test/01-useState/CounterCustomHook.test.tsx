
import { CounterCustomHook } from "@/01-useState/CounterCustomHook";
import {  render, screen, fireEvent } from "@testing-library/react";


describe('CounterApp.test.tsx', () => {

    test('Should contain counter heading', () => {
        render(<CounterCustomHook />)
        expect(screen.getByText(`Counter with hook: 0`)).toBeInTheDocument();
    })
    test('Should contain increment buttons', () => {
        render(<CounterCustomHook />)

        expect(screen.getByText('+1')).toBeInTheDocument();
        expect(screen.getByText('reset')).toBeInTheDocument();
        expect(screen.getByText('-1')).toBeInTheDocument();
    })

    test('Should increment value on click counter buttons', () => {
        render(<CounterCustomHook />)
        const counterButtons = screen.getAllByRole('button');
        fireEvent.click(counterButtons[0])
        expect(screen.getByText(`Counter with hook: 2`)).toBeInTheDocument();
        fireEvent.click(counterButtons[1])
        expect(screen.getByText(`Counter with hook: 0`)).toBeInTheDocument();
        fireEvent.click(counterButtons[2])
        expect(screen.getByText(`Counter with hook: 0`)).toBeInTheDocument();

    })
})