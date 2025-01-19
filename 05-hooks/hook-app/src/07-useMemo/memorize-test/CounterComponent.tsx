import React, { useMemo, useState } from 'react'
import { ButtonComponent } from './ButtonComponent'

export const CounterComponent = () => {
    const elements = useMemo(()=> [1, 2, 3, 4], [])
    const [counter, setCounter] = useState(0)

    const handleIncrement = () => {
        setCounter((counter) => counter + 1)
    }
    return (
        <>
            <h1>{counter}</h1>
            <button onClick={() => handleIncrement()}>Increment</button>
            <ButtonComponent elements={elements}/>
        </>
    )
}
