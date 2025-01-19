import { useCounter } from "@/01-useState/hooks/useCounter"
import { renderHook } from "@testing-library/react"

describe('useCounter.test.ts', ()=>{

    const inititalValue = 10;
    test('Should return default values', ()=>{
       const {result}= renderHook(()=>useCounter(inititalValue))
       console.log(result);

       expect(result.current).toMatchObject(
        expect.objectContaining(
            {
                counter: inititalValue,
                increment: expect.any(Function),
                decrement: expect.any(Function),
                reset: expect.any(Function),
            }
        )
       )
       
    })

    test('Should return hook with custom value', ()=>{
        const {result}= renderHook(()=>useCounter(inititalValue))
        console.log(result);
 
        expect(result.current).toMatchObject(
         expect.objectContaining(
             {
                 counter: inititalValue,
                 increment: expect.any(Function),
                 decrement: expect.any(Function),
                 reset: expect.any(Function),
             }
         )
        )
     })

     test('Should increment counter', ()=>{
        const {result, rerender}= renderHook(()=>useCounter(inititalValue))
        console.log(result);

        result.current.increment()
        rerender();
        expect(result.current.counter).toBe(inititalValue+1)
     })

     test('Should decrement counter', ()=>{
        const {result, rerender}= renderHook(()=>useCounter(inititalValue))
        console.log(result);

        result.current.decrement()
        rerender();
        expect(result.current.counter).toBe(inititalValue-1)
     })

     test('Should reset counter', ()=>{
        const {result, rerender}= renderHook(()=>useCounter(inititalValue))
        console.log(result);

        result.current.reset()
        rerender();
        expect(result.current.counter).toBe(inititalValue)
     })
})