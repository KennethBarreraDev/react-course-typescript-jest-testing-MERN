import {act, renderHook } from "@testing-library/react"
import { TodoActionsOption } from '@/10-useReducer/todoReducer';
import { useTodo } from '@/10-useReducer/useTodo';


TodoActionsOption
describe('useTodo.test.ts', () => {
    const onResetForm = jest.fn();
    const formState = { 'create-todo-input': 'Buy milk' };

    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('should initialize with todos from localStorage', () => {
        const initialTodos = [
            { id: 1, todo: 'Buy milk', done: false },
            { id: 2, todo: 'Walk the dog', done: true },
        ];
        localStorage.setItem('todos', JSON.stringify(initialTodos));

        const { result } = renderHook(() => useTodo(formState, onResetForm));

        expect(result.current.todos).toEqual(initialTodos);
    });

    test('should create a new todo', () => {
        const { result } = renderHook(() => useTodo(formState, onResetForm));

        act(() => {
            result.current.handleNewTodo({
                preventDefault: jest.fn(),
            } as unknown as React.FormEvent<HTMLFormElement>);
        });

        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0].todo).toBe('Buy milk');
    });

    test('should delete a todo', () => {
        const initialTodos = [
            { id: 1, todo: 'Buy milk', done: false },
        ];
        localStorage.setItem('todos', JSON.stringify(initialTodos));

        const { result } = renderHook(() => useTodo(formState, onResetForm));

        act(() => {
            result.current.deleteTodo(1);
        });

        expect(result.current.todos).toHaveLength(0);
    });

    test('should mark a todo as completed', () => {
        const initialTodos = [
            { id: 1, todo: 'Buy milk', done: false },
        ];
        localStorage.setItem('todos', JSON.stringify(initialTodos));

        const { result } = renderHook(() => useTodo(formState, onResetForm));

        act(() => {
            result.current.completeTodo(1);
        });

        expect(result.current.todos[0].done).toBe(true);
    });
});
