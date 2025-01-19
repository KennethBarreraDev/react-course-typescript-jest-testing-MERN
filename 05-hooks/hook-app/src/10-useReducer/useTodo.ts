import React, { useCallback, useEffect, useReducer } from 'react'
import { TodoActionsOption, todoReducer } from './todoReducer'

export const useTodo = (formState: {[key: string]: any;}, onResetForm: () => void) => {
    const init = () => {
        try {
            return JSON.parse(localStorage.getItem('todos') ?? "[]")
        } catch (error) {
            return []
        }
    }

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])


    const handleNewTodo = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTodo = {
            id: new Date().getTime(),
            todo: formState!["create-todo-input"],
            done: false
        }

        const action = {
            type: TodoActionsOption.ADD_TODO,
            payload: newTodo
        }
        dispatch(action)
        onResetForm()
    }, [formState])

    const deleteTodo = useCallback((id: number) => {
        const action = {
            type: TodoActionsOption.DELETE_TODO,
            payload: id
        }
        dispatch(action)
    }, [])

    
    const completeTodo = useCallback((id: number) => {
        const action = {
            type: TodoActionsOption.COMPLETE_TODO,
            payload: id
        }

        dispatch(action)

    }, [])


    return {
        handleNewTodo,
        deleteTodo,
        completeTodo,
        todos
    }
}
