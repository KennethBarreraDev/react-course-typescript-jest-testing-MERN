import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import { decrement, increment, incrementByAmount } from './store/slices/counter/counter-slice';

function App() {
  const counter = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch()

  return (
    <>
      <h1>Counter: {counter}</h1>
      <div className="card">


        <button onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button onClick={() => dispatch(incrementByAmount({ value: 2 }))}>
          Incement by two
        </button>
      </div>
    </>
  )
}

export default App
