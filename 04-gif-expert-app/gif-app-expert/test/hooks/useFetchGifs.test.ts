import { useFetchGifs } from "@/hooks/useFetchGifs"
import { renderHook, waitFor } from "@testing-library/react"

describe('UseFecthGifs.test', () => {
    const category = 'cats';
    test('Should return initial state', () => {
        const { result } = renderHook(() =>
            useFetchGifs(category)
        )

        const {images, isLoading} = result.current;

        expect(images.length).toBe(0)
        expect(isLoading).toBe(true)
    })

    test('Should return an array of gifs', async() => {
        const { result } = renderHook(() =>
            useFetchGifs(category)
        )
        await waitFor(()=>{
           expect(result.current.images.length).toBeGreaterThan(0),
           expect(result.current.isLoading).toBe(false)
        })
    })

})