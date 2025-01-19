import { TodoApp } from "@/10-useReducer/TodoApp"
import { useTodo } from "@/10-useReducer/useTodo"
import { render, screen } from "@testing-library/react"

jest.mock('@/10-useReducer/useTodo')

describe('TodoApp.test.tsx', () => {
    const handleNewTodo = jest.fn()
    const deleteTodo = jest.fn()
    const completeTodo = jest.fn()
    const todo = {
        id: 1,
        todo: 'Milk',
        done: false
    }

    beforeEach(() => {
        jest.clearAllMocks();
        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            handleNewTodo,
            deleteTodo,
            completeTodo

        });
    });

    test('should render component correctly', () => {
        render(<TodoApp />)
        expect(screen.getByText(todo.todo)).toBeInTheDocument()
        expect(screen.getByRole('textbox')).toBeTruthy()
    })
})
