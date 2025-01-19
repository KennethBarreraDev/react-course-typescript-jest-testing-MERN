import { TodoList } from '@/10-useReducer/TodoList';
import { TodoListItem } from '@/10-useReducer/TodoListItem';
import { render } from '@testing-library/react';

jest.mock('@/10-useReducer/TodoListItem', () => ({
    TodoListItem: jest.fn(() => <li>Mocked TodoListItem</li>),
}));

describe('TodoList Component', () => {
    const handleDeleteTodo = jest.fn();
    const handleCompleteTodo = jest.fn();

    const todos = [
        { id: 1, todo: 'Buy milk', done: false },
        { id: 2, todo: 'Clean house', done: true },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('Should pass the correct props to TodoListItem', () => {
        render(<TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo} />);

        expect(TodoListItem).toHaveBeenCalledTimes(todos.length);

        todos.forEach((todo, index) => {
            expect(TodoListItem).toHaveBeenNthCalledWith(index + 1, {
                todo,
                handleDeleteTodo,
                handleCompleteTodo,
            }, {});
        });
    });
});
