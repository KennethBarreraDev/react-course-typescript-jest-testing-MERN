import { TodoObject } from "./todoReducer"

type TodoListItemProps = {
    todo: TodoObject,
    handleDeleteTodo: (id: number) => void,
    handleCompleteTodo: (id: number) => void
}

export const TodoListItem = ({ todo, handleDeleteTodo, handleCompleteTodo }: TodoListItemProps) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="align-self-center" aria-label="todo-span">
                <input className="form-check-input me-2" type="checkbox"  onChange={()=>handleCompleteTodo(todo.id)} checked={todo.done}/>
                {todo.done ? <del data-testid="completed-todo">{todo.todo}</del> : todo.todo}</span>
            <span>
                <button className="btn btn-danger" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </span>
        </li>
    )
}
