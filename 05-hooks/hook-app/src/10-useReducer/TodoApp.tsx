import { TodoList } from "./TodoList";
import { TodoAdd } from "./TodoAdd";
import { useCustomForm } from "../02-useEffect/hook/useCustomForm";
import { useTodo } from "./useTodo";

export const TodoApp = () => {
    const { formState, onInputChange, onResetForm } = useCustomForm({
        'create-todo-input': ''
    })

    const {handleNewTodo, deleteTodo,completeTodo, todos} = useTodo(formState ?? {}, onResetForm)

    return (
        <>
            <h1>TodoApp ({todos.length}) pending:{todos.filter((todo)=>todo.done==false).length}</h1>
            <hr />
            <div className="row">
                <div className="col-7">
                    <TodoList todos={todos} handleDeleteTodo={deleteTodo} handleCompleteTodo={completeTodo} />
                </div>
                <div className="col-5">
                    <TodoAdd onInputChange={onInputChange} handleNewTodo={handleNewTodo} inputValue={('create-todo-input' in (formState ?? {})) ? formState!['create-todo-input'] : ''} />
                </div>
            </div>

        </>
    )
}
