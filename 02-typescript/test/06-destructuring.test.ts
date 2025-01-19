import { returnPerson } from '../src/06-destructuring'

describe('06-destructuring.ts', () => {
    test('Should return a person', () => {

        const firstName: string = 'Brunce'
        const nickname: string = 'Hulk'
        const age:number = 32;

        const person = returnPerson({firstName:firstName, nickname:nickname, age: age })
        expect(person).toEqual(
            expect.objectContaining({
                nickname: nickname,
                newAge: age+2,
                latlng: {
                    lat: expect.any(Number), // Validar que sea un número
                    lng: expect.any(Number), // Validar que sea un número
                  },
            }),
        );
    })
})