import { useState } from "react"

type Props = {
    onAddCategory: (value: string)=>void
}

export const AddCategory = ({onAddCategory}: Props) => {
    console.log('Add category');

    const [inputValue, setinputValue] = useState<string>('')


    const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const writtenValue = event.target.value
        setinputValue(writtenValue)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        if(inputValue=='') return;
        console.log('Entrando con ', inputValue);
        
        onAddCategory(inputValue)
        setinputValue('')
    }


    return (
        <>
            <form onSubmit={((event)=>handleSubmit(event))} aria-label="gif-finder">
                <input type="text" placeholder="Find gifs" value={inputValue} onChange={(event) => handleEvent(event)} aria-label="find-gifs-input"/>
            </form>
        </>
    )
}
