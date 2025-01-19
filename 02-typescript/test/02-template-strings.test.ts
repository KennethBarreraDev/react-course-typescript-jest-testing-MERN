import {greeting} from '../src/02-template-strings'

describe('02-template-string.ts', ()=>{
    test('should return a greting', () => {
        const name: string = 'Kenneth';

        const result = greeting(name)

        expect(result).toBe(`Hello ${name}`)
    })
    
})