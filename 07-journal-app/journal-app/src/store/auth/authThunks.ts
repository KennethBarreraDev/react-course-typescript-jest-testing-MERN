import { Dispatch } from "@reduxjs/toolkit"
import { AuthStatus, checkingCredentials, login, logout } from "./authSlice"
import { getUserSession, loginWithEmail, logoutUser, signInWithEmail, signInWithGoogle } from "../../firebase/auth_provider"
import { getNotesFromDB } from "../journal/journalThunks"
import { resetState } from "../journal/journalSlice"

export const startLoginWithEmail = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const signInResponse = await loginWithEmail(email, password);
        if (signInResponse.status) {
            dispatch(login({
                status: AuthStatus.AUTHENTICATED,
                uuid: signInResponse.uuid,
                displayName: signInResponse.displayName,
                email: signInResponse.email,
                photoURL: signInResponse.photoURL
            }))
        } else {
            dispatch(logout({
                status: AuthStatus.NOT_AUTHENTICATED,
                errorMessage: 'User or password incorrect'
            }))
        }
    }
}

export const startGoogleLogin = () => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const signInResponse = await signInWithGoogle();
        if (signInResponse.status) {
            dispatch(login({
                status: AuthStatus.AUTHENTICATED,
                uuid: signInResponse.uuid,
                displayName: signInResponse.displayName,
                email: signInResponse.email,
                photoURL: signInResponse.photoURL
            }))
        } else {
            dispatch(logout({
                status: AuthStatus.NOT_AUTHENTICATED,
                errorMessage: 'Error while login with google'
            }))
        }
    }
}


export const startUserRegister = (email: string, password: string, displayName: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const signInResponse = await signInWithEmail(email, password, displayName);


        if (signInResponse.status) {
            dispatch(login({
                status: AuthStatus.AUTHENTICATED,
                uuid: signInResponse.uuid,
                displayName: signInResponse.displayName,
                email: signInResponse.email,
                photoURL: signInResponse.photoURL
            }))
        } else {
            dispatch(logout({
                status: AuthStatus.NOT_AUTHENTICATED,
                errorMessage: 'Error creating user'
            }))
        }
    }
}

export const getActiveUserSession = () => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const userSession = await getUserSession();


        if (userSession.status) {
            dispatch(login({
                status: AuthStatus.AUTHENTICATED,
                uuid: userSession.uuid,
                displayName: userSession.displayName,
                email: userSession.email,
                photoURL: userSession.photoURL
            }))

            const getNotesFromDBThunk = getNotesFromDB();
            getNotesFromDBThunk(dispatch)
        } else {
            dispatch(logout({
                status: AuthStatus.NOT_AUTHENTICATED,
                errorMessage: 'Error fetching user'
            }))
        }
    }
}



export const startUserLogout = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(checkingCredentials())
        await logoutUser();
        dispatch(resetState());
       dispatch( logout({
        status: AuthStatus.NOT_AUTHENTICATED,
    }))
    }
}
