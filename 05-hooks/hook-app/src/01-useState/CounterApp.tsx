import { useState } from "react"

type Counters = {
    counter1: number,
    counter2: number,
    counter3: number
}


export const CounterApp = () => {
    const [counter, setCounter] = useState<Counters>({
        counter1: 10,
        counter2: 20,
        counter3: 30
    })
    return (
        <>
            <h1>Counter1: {counter.counter1}</h1>
            <h1>Counter2: {counter.counter2}</h1>
            <h1>Counter3: {counter.counter3}</h1>
            <hr />
            <button className="btn btn-primary me-3" onClick={() => setCounter({
                ...counter,
                counter1: counter.counter1 + 1,
            })}>+1 counter 1</button>
            <button className="btn btn-primary me-3" onClick={() => setCounter({
                ...counter,
                counter2: counter.counter2 + 1,
            })}>+1 counter 2</button>

            <button className="btn btn-primary me-3" onClick={() => setCounter({
                ...counter,
                counter3: counter.counter3 + 1,
            })}>+1 counter 3</button>
        </>
    )
}
