import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum AuthStatus { 
    CHECKING = 'CHECKING', 
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED', 
    AUTHENTICATED = 'AUTHENTICATED' 
}

interface AuthState {
    status: AuthStatus,
    uuid?: string | null,
    email?: string | null,
    displayName?: string | null,
    photoURL?: string | null,
    errorMessage?: string | null
}

const initialState: AuthState = {
    status: AuthStatus.CHECKING,
    uuid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthState, action: PayloadAction<AuthState>) => {
            const {status, uuid, email, displayName, photoURL} = action.payload

            state.status = status;
            state.uuid = uuid;
            state.email = email;
            state.displayName = displayName;
            state.photoURL = photoURL;
            state.errorMessage = null;
        },
        logout: (state: AuthState, action: PayloadAction<AuthState>) => {
            const {status, errorMessage} = action.payload
            state.status = status;
            state.uuid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = errorMessage;
        },
        checkingCredentials: (state: AuthState) => {
            state.status = AuthStatus.CHECKING;
        },
    },
})

export const { login, logout, checkingCredentials } = authSlice.actions

