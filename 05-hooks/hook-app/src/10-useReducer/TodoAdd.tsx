import React from "react";

type TodoAddProps = {
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleNewTodo: (event: React.FormEvent<HTMLFormElement>)=>void,
    inputValue: string
}

export const TodoAdd = React.memo(({onInputChange, handleNewTodo, inputValue}:TodoAddProps) => {
    console.log('Rendering TodoAdd');
    
    return (
        <>
            <h4>Add todo</h4>
            <hr />
            <form onSubmit={(event)=>handleNewTodo(event)} role="form">
                <input
                    type="text"
                    placeholder="Insert your todo"
                    className="form-control"
                    name="create-todo-input"
                    onChange={(event)=>onInputChange(event)}
                    value={inputValue}
                
                />
                <button
                    type="submit"
                    className="btn btn-outline-primary mt-2"
                >
                    Create todo</button>
            </form>
        </>
    )
})
