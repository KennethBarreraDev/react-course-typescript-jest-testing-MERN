import { useMemo } from 'react'
import { Child } from './Child'
import { useState } from 'react';

export const Parent = () => {

    const numbers = useMemo(() => {
        return [2, 4, 6, 8, 10]
    }, []);

    const [value, setValue] = useState(0);


    const increment = useMemo(() => {
        return (number: number) => {
            setValue((value) => value + number)
        }
    }, [
    ])
    
    // const increment = useCallback((number: number) => {
    //     setValue((value)=> value + number)
    // }, [
    // ])

    return (
        <div>
            <h1>Parent</h1>
            <p> Total: {value} </p>

            <hr />

            {
                numbers.map(n => (
                    <Child
                        key={n}
                        number={n}
                        increment={increment}
                    />
                ))
            }
            {/* <Hijo /> */}
        </div>
    )
}
