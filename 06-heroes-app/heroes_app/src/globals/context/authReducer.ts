export enum AuthStates {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    DEFAULT = 'DEFAULT'

}


export type User = {
    logged: boolean
    name: string | null,
}

export type AuthReducerAction = {
    action: AuthStates
    payload: string | null
}

export const authReducer = (state: User, action: AuthReducerAction): User => {
    switch (action.action) {
        case AuthStates.LOGIN:
            return {
                logged: true,
                name: action.payload
            }
            break;
        case AuthStates.LOGOUT:
            return {
                logged: false,
                name: action.payload
            }
            break;
        default:
            return state;
            break;
    }
}
