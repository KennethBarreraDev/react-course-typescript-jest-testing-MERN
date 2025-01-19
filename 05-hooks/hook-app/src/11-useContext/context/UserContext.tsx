import { createContext, ReactNode, useState } from "react";
type UserProviderProps = {
    children: ReactNode
}

type UserInfoProps = {
    id: number,
    email: string
}

type UserProviderEmitProps = {
    user: UserInfoProps | null,
    handleLogin: ()=>void
}

export const UserContext = createContext<UserProviderEmitProps | null>(null)


export const UserProvider = ({ children }: UserProviderProps) => {

    const [user, setUser] = useState<UserInfoProps | null>(null)
    const handleLogin = () => {
        setUser({
            id: 1,
            email: 'kenneth@mail.com',
        }
        )
    }
    return (
        <UserContext.Provider value={{user, handleLogin}}>
            {children}
        </UserContext.Provider>
    )
}
