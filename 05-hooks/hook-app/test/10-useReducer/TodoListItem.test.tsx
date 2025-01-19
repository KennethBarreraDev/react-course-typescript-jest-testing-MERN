import { TodoListItem } from '@/10-useReducer/TodoListItem';
import { fireEvent, render, screen } from '@testing-library/react';


describe('TodoListItem.test.tsx', () => { 
    const handleDeleteTodo = jest.fn();
    const handleCompleteTodo = jest.fn();
    const todo = {
        id: 1,
        todo: 'Milk',
        done: false
    }
    test('Should show initial class names', () => { 
        render(<TodoListItem todo={todo} handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo}/>)
        const liElement = screen.getByRole('listitem');
        expect(liElement.className).toContain('list-group-item d-flex justify-content-between')
        const spanElement = screen.getByLabelText('todo-span')
        expect(spanElement.className).toContain('align-self-center')
     })

     test('Should render completed component', () => { 
        render(<TodoListItem todo={{...todo, done: true}} handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo}/>)
        const completedTodo = screen.getByTestId('completed-todo')
        expect(completedTodo).toBeInTheDocument()
     })


     test('Should call handleCompleteTodo when checkbox is clicked', () => { 
        render(<TodoListItem todo={{...todo, done: true}} handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo}/>)
        const completedTodo = screen.getByRole('checkbox')
        fireEvent.click(completedTodo)
        expect(handleCompleteTodo).toHaveBeenCalledTimes(1)
     })

     
     test('Should call handleDeleteTodo when button is clicked', () => { 
        render(<TodoListItem todo={{...todo, done: true}} handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo}/>)
        const deleteTodo = screen.getByRole('button')
        fireEvent.click(deleteTodo)
        expect(handleDeleteTodo).toHaveBeenCalledTimes(1)
     })

 })