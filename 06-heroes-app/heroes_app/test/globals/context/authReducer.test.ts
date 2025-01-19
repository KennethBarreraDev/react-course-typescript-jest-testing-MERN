import { authReducer, AuthStates } from "@/globals/context/authReducer"


describe('authReducer.test.ts', () => {
    const defaultUser = {
        logged: false,
        name: null
    }


    test('Should return initial value', () => {
        const initialAction = {
            action: AuthStates.DEFAULT,
            payload: null
        }
        const auth = authReducer(defaultUser, initialAction)

        expect(auth).toEqual(defaultUser)
    })

    
    test('Should login user', () => {

        const loginAction = {
            action: AuthStates.LOGIN,
            payload: 'Kenneth'
        }
        const auth = authReducer(defaultUser, loginAction)

        expect(auth).toEqual({
            logged: true,
            name: loginAction.payload
        })
    })

    test('Should logout user', () => {

        const logoutAction = {
            action: AuthStates.LOGOUT,
            payload: null
        }
        const auth = authReducer(defaultUser, logoutAction);

        expect(auth).toEqual({
            logged: false,
            name: logoutAction.payload
        })
    })
})