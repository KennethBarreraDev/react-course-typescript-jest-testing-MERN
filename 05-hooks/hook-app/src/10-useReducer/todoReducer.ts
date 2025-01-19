export type TodoObject = {
    id: number,
    todo: string,
    done: boolean
}

export enum TodoActionsOption {
    ADD_TODO = 'ADD_TODO',
    DELETE_TODO = 'DELETE_TODO',
    EDIT_TODO = 'EDIT_TODO',
    COMPLETE_TODO = 'COMPLETE_TODO',
    DEFAULT_ACTION = 'DEFAULT_ACTION'
}

export type TodoActions = {
    type: TodoActionsOption,
    payload: TodoObject | number,
}

export const todoReducer = (state: TodoObject[], action: TodoActions) => {

    switch (action.type) {
        case TodoActionsOption.ADD_TODO:
            if (isTodoObject(action.payload)) {
                return [
                    ...state,
                    action.payload
                ];
            }
            break;

        case TodoActionsOption.DELETE_TODO:
            if (typeof action.payload === 'number') {
                const filteredTodos = state.filter((todo) => todo.id != action.payload);
                return [...filteredTodos]
            }
            break;
        case TodoActionsOption.COMPLETE_TODO:
            if (typeof action.payload === 'number') {
                const modifiedTodos = state.map((todo) => {
                    if (todo.id === action.payload) {
                        return {
                            ...todo,
                            done: !todo.done
                        };
                    }
                    return todo;
                });
                return [...modifiedTodos];
            }

            break;

        case TodoActionsOption.DEFAULT_ACTION:
            return state;
        break;
    }
    return state;
}


const isTodoObject = (payload: any): payload is TodoObject => {
    return payload &&
        typeof payload.id === 'number' &&
        typeof payload.todo === 'string' &&
        typeof payload.done === 'boolean';
};