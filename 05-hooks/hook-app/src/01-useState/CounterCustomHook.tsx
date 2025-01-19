import { useCounter } from "./hooks/useCounter"

export const CounterCustomHook = () => {
  const {increment, decrement, reset, counter} = useCounter(0, 2)
  return (
    <>
      <h1>Counter with hook: {counter}</h1>
      <hr/>
      <button className="btn btn-primary me-2" onClick={()=>increment()}>+1</button>
      <button className="btn btn-primary me-2" onClick={()=>reset()}>reset</button>
      <button className="btn btn-primary me-2" onClick={()=>decrement()}>-1</button>

    </>
  )
}
