import React from 'react'
import { TodoObject } from './todoReducer'
import { TodoListItem } from './TodoListItem'

type TodoListProps = {
    handleDeleteTodo: (id: number) =>void,
    handleCompleteTodo: (id: number) => void
    todos: TodoObject[]
};

export const TodoList = React.memo(
    ({todos, handleDeleteTodo, handleCompleteTodo}: TodoListProps) => {
        console.log('Rendering todo list');
        
        return (
            <ul className="list-group">
                {todos.map((element) => <TodoListItem key={element.id} todo={element} handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo} />)}
            </ul>
        )
    }
)
