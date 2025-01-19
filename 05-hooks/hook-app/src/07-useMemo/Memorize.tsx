import { useMemo, useState } from "react";
import { useCounter } from "../01-useState/hooks/useCounter"

const heavyStuff = (iterationNumber = 100) => {
    for (let index = 0; index < iterationNumber; index++) {
        console.log(index);
    }

    return `${iterationNumber} iterations`
}

export const MemorizeHook = () => {

    const { counter, increment } = useCounter(0);
    const [show, setShow] = useState(true)
    
    const memorized = useMemo(() => heavyStuff(counter),
        [counter])

    return (
        <>
            <h1>Counter:<small data-testid='counter-test-hook'>{counter}</small></h1>
            <hr />

            <h4>{memorized}</h4>
            <button className="btn btn-primary me-2" onClick={() => increment()}>+1</button>

            <button className="btn btn-outline-primary" onClick={() => setShow(!show)}>
                Show/Hide {JSON.stringify(show)}
            </button>
        </>
    )
}
