import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store";
import calendarApi from "../../api/calendar_api";
import { onErrorStatus, onLogin, onLogout, onSuccessStatus, setCheckingStatus } from "../../store/auth/authSlice";
import { useEffect } from "react";

type UserCredentails = {
    email: string,
    password: string
}

type UserBody = {
    name: string,
    email: string,
    password: string
}

export const useAuthStore = () => {
    const { user, errorMessage, status, successMesage } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem('user');

        if(user){
            dispatch(onLogin({ ...JSON.parse(user) }))
        }
    }, [])
    

    const startLogin = async ({ email, password }: UserCredentails) => {
        try {
            dispatch(setCheckingStatus());
            const response = await calendarApi.post('/user/login', { email, password })
            if (response.status >= 200 && response.status <= 299) {
                const userInfo = {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    username: response.data.user.name,
                    token: response.data.token
                };
                localStorage.setItem('user', JSON.stringify(userInfo));
                localStorage.setItem('token', response.data.token);
                dispatch(onLogin({ ...userInfo }))
            }
            else {
                dispatch(onErrorStatus(response.data))

                setTimeout(() => {
                    dispatch(onErrorStatus(""))
                }, 10)
            }
        } catch (error) {
            dispatch(onErrorStatus('An error has occured'))
            setTimeout(() => {
                dispatch(onErrorStatus(""))
            }, 10)
        }
    }


    const startCreatingUser = async ({name, email, password }: UserBody) => {
        try {
            dispatch(setCheckingStatus());
            const response = await calendarApi.post('/user/create', { name, email, password })
            if (response.status >= 200 && response.status <= 299) {
                dispatch(onSuccessStatus('User created successfully'))

                setTimeout(() => {
                    dispatch(onSuccessStatus(""))
                }, 10)
            }
            else {
                dispatch(onErrorStatus(response.data))

                setTimeout(() => {
                    dispatch(onErrorStatus(""))
                }, 10)
            }
        } catch (error) {
            dispatch(onErrorStatus('An error has occured'))
            setTimeout(() => {
                dispatch(onErrorStatus(""))
            }, 10)
        }
    }

    const startLogOut = ()=>{
        localStorage.clear()
        dispatch(onLogout())
    }
    return {
        user,
        errorMessage,
        successMesage,
        status,
        startLogin,
        startLogOut,
        startCreatingUser
    }
}