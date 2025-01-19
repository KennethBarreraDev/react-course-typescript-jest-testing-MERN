import { useCallback, useState } from "react"
import { ShowIncrement } from "./ShowIncrement"

export const CallBackHook = () => {
    const [counter, setCounter] = useState(10)

    const increment = useCallback(
        (incrementValue: number) => {
            setCounter((c) => c + incrementValue)
        },
        [],
    )

    // const increment = useMemo(
    //     () => {
    //         return ()=>{
    //             setCounter((c) => c + 1)
    //         }
    //     },
    //     [],
    // )

    return (
        <>
            <h1>
                Use callback hook:  {counter}
            </h1>
            <hr />
            <ShowIncrement increment={increment} />
        </>
    )
}
