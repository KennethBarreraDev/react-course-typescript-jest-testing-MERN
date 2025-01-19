import { authSlice, AuthStatus, checkingCredentials, login, logout } from "@/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState } from "@/fixtures/authFixtures"

describe('authSlice.test.ts', () => {
    test('Should return initial state ', () => {
        expect(authSlice.name).toBe('auth')
    })

    test('Should authenticate user', () => {
        const state = authSlice.reducer(initialState, login(authenticatedState));
        expect(state).toMatchObject(expect.objectContaining(
            {
                ...authenticatedState
            }
        ))
    })

    test('Should logout user', () => {
        const state = authSlice.reducer(authenticatedState, logout(notAuthenticatedState));
        expect(state).toMatchObject(expect.objectContaining(
            {
                ...notAuthenticatedState
            }
        ))
    })


    test('Should change status to checking', () => {
        const state = authSlice.reducer(initialState, checkingCredentials());
        expect(state.status).toBe(AuthStatus.CHECKING)
    })
})
