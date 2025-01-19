import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export enum USER_STATUS {
    AUTHENTICATED = 'AUTHENTICATED',
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
    CHECKING = 'CHECKING',
    SUCCESS_CREATION = 'SUCCESS_CREATION'
}

type User = {
    id?: string
    email?: string, 
    username?: string,
    token?: string
};

type AuthState = {
    status: USER_STATUS,
    user: User,
    errorMessage: string,
    successMesage: string
}

const initialState: AuthState = {
    status: USER_STATUS.CHECKING,
    user: {},
    errorMessage: '',
    successMesage: ''
}

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setCheckingStatus:(state: AuthState)=>{
            state.status = USER_STATUS.CHECKING;
            state.user = state.user;
            state.errorMessage = '';
            state.successMesage = ''
        },
        onLogin:(state: AuthState, action: PayloadAction<User>)=>{
            state.status = USER_STATUS.AUTHENTICATED;
            state.user = action.payload;
            state.errorMessage = ''
            state.successMesage = ''
        },

        onLogout:(state: AuthState)=>{
            state.status = USER_STATUS.NOT_AUTHENTICATED;
            state.user = {};
            state.errorMessage = ''
            state.successMesage = ''
        },
        onErrorStatus:(state: AuthState, action: PayloadAction<string>)=>{
            state.status = USER_STATUS.NOT_AUTHENTICATED;
            state.user = state.user;
            state.errorMessage = action.payload;
            state.successMesage = ''

        },
        onSuccessStatus:(state: AuthState, action: PayloadAction<string>)=>{
            state.status = USER_STATUS.SUCCESS_CREATION;
            state.user = state.user;
            state.errorMessage = '';
            state.successMesage = action.payload

        },
    },
})

export const { setCheckingStatus,  onLogin, onLogout, onErrorStatus, onSuccessStatus} = authSlice.actions
export default authSlice.reducer