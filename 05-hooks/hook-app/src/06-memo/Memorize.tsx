import { useState } from "react";
import { useCounter } from "../01-useState/hooks/useCounter"
import { SmallCounter } from "./SmallCounter";

export const Memorize = () => {

    const { counter, increment } = useCounter(0);

    const [show, setShow] = useState(true)
    return (
        <>
            <h1>Counter: <SmallCounter counterValue={counter} /></h1>
            <hr />
            <button className="btn btn-primary me-2" onClick={() => increment()}>+1</button>
            
            <button className="btn btn-outline-primary" onClick={() => setShow(!show)}>
                Show/Hide {JSON.stringify(show)}
            </button>
        </>
    )
}
