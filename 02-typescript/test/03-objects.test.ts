import {person} from '../src/03-objects'

describe('03-objects.ts', ()=>{
    test('Should return an object with given structure', () => {
        expect(person).toEqual(
            expect.objectContaining(
                {
                    name: expect.any(String),
                    lastName:  expect.any(String),
                    age:  expect.any(Number),
                    address:{
                        city: expect.any(String),
                        zip: expect.any(Number),
                        lat: expect.any(Number),
                        lng: expect.any(Number)
                    }
                }
            )
        )
    })
    
})