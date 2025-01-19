import { useState } from "react"

type CounterFunctions = {
    counter: number,
    increment: () => void,
    decrement: () => void,
    reset: () => void
}

export const useCounter = (initialValue: number=0, incementValue=1): CounterFunctions => {
    const [counter, setCounter] = useState(initialValue)

    const increment = () => {
        setCounter(counter + incementValue)
    }
    const decrement = () => {
        if(counter-incementValue<1) return;
        setCounter(counter - incementValue)
    }
    const reset = () => {
        setCounter(initialValue)
    }

    return {
        counter,
        increment,
        decrement,
        reset
    }
}
