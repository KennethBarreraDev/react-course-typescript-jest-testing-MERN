import { returnArray } from '../src/07-array-destructuring'

describe('07-array-destructuring.ts', () => {
    test('Should return an number and a string', () => {
        const [value1, value2] = returnArray()

        expect(value1).toStrictEqual(expect.any(String))
        expect(value2).toStrictEqual(expect.any(Number))

    })
})