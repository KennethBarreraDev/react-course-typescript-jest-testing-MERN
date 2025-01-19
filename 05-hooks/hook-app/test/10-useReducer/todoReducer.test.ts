import { TodoActionsOption, todoReducer } from "@/10-useReducer/todoReducer"

describe('todoReducer.test.ts', () => {

    const initialState = {
        id: 1,
        todo: 'Buy milk',
        done: false
    }
    test('should return initial state', () => {
        const action = {
            type: TodoActionsOption.DEFAULT_ACTION,
            payload: initialState
        } 
       const todos = todoReducer([initialState], action);
       expect(todos).toEqual([initialState]);  
     })

     test('Should add todo', () => {
        const action = {
            type: TodoActionsOption.ADD_TODO,
            payload: initialState
        } 
       const todos = todoReducer([], action);
       expect(todos).toEqual([initialState]);  
     })


     test('Should delete todo', () => {
        const action = {
            type: TodoActionsOption.DELETE_TODO,
            payload: initialState.id
        } 
       const todos = todoReducer([initialState], action);
       expect(todos).toEqual([]);  
     })


     test('Should complete todo', () => {
        const action = {
            type: TodoActionsOption.COMPLETE_TODO,
            payload: initialState.id
        } 
       const todos = todoReducer([initialState], action);
       expect(todos).toEqual([{...initialState, done: !initialState.done}]);  
     })
})
