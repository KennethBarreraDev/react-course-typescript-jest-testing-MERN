import { getUser, getActiveUser } from '../src/05-functions'

describe('05-functions.ts', () => {
    test(' getUser should return an user', () => {
        const user = getUser()
        expect(user).toEqual(
            expect.objectContaining({
                uid: expect.any(String),
                username: expect.any(String),
            }),
        );
    })

    test('getActiveUser should return an user', () => {
        const userName = 'Kenneth';
        const user = getActiveUser(userName)
        expect(user).toEqual(
            expect.objectContaining({
                uid: expect.any(String),
                username: userName,
            }),
        );
    })
})