import {useState} from 'react'

type Counter={
    value: number
}


export const CounterApp = ({value}: Counter) => {
    const [counter, setCounter] = useState<number>(value)

    const additionHandler= (event: React.MouseEvent<HTMLButtonElement>)=>{
        console.log('Calling hook');
        console.log(event);
        
        setCounter(counter + 1) 
    }

    const substractionHandler= ()=>{
        console.log('Calling hook');
        setCounter(counter - 1) 
    }

    const resetHandler= ()=>{
        console.log('Calling hook');
        setCounter(value) 
    }

    return (
        <>
            <h1>CounterApp</h1>
            <h2> {counter} </h2>
            <button data-testid='decrement-button' onClick={
                ()=>substractionHandler()
            }>-1</button>
            <button onClick={
                ()=>resetHandler()
            } aria-label='btn-reset'>reset</button>
            <button onClick={
                (event)=>additionHandler(event)
            }>+1</button>
        </>
    )
}
