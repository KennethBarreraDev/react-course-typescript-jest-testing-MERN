import { createContext, ReactNode, useReducer } from "react";
import { authReducer, AuthStates, User } from "./authReducer";

type AuthProviderProps = {
    children: ReactNode;
}

type AuthProviderApi = {
    state: User,
    login: (name: string) => void,
    logout: () => void
}

export const AuthContext = createContext<AuthProviderApi | null>(null);


const init = ()=>{
    const user = localStorage.getItem('user');
    return user
    ? { ...JSON.parse(user), logged: true } 
    : { logged: false, name: null }; 
}
export const AuthProvider = ({ children }: AuthProviderProps) => {

    const initialState = { logged: false, name: null }
    const [state, dispatch] = useReducer(authReducer, initialState, init)

    const login = (name: string) => {
        const loginUser = {
            action: AuthStates.LOGIN,
            payload: name
        }
        dispatch(loginUser)
        localStorage.setItem('user', JSON.stringify({...loginUser, name: name}))
    }

    const logout = () => {
        const logoutUser = {
            action: AuthStates.LOGOUT,
            payload: null
        }
        dispatch(logoutUser)
        localStorage.clear();
    }



    // useEffect(() => {
    //     console.log('Obteniendo usuario');
        
    //     const user = localStorage.getItem('user')
    //     if (user) {
    //         dispatch(JSON.parse(user))
    //         navigate('/')
    //     }
    //     else{
    //         navigate('/login')
    //     }
    // }, [])
    return (
        <AuthContext.Provider value={{ state: state, login: login, logout: logout }}>
            {children}
        </AuthContext.Provider>
    )
}
