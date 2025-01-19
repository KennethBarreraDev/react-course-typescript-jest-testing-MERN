import { useFetch } from "@/03-examples/hooks/useFetch";
import { renderHook, waitFor } from "@testing-library/react";

describe('useFetch.test.ts', () => {
  const pokemonId = 1;
  const wrongPokemonId = -999;


  test('Should start with loading state', () => {
    const { result } = renderHook(() => useFetch(pokemonId));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.data).toBeNull();
  });

  test('Should fetch data and return it on successful response', async () => {
    

    const { result } = renderHook(() => useFetch(pokemonId));

    await waitFor(()=>{
        expect(result.current.isLoading).toBe(false)
        expect(result.current.hasError).toBe(false)
     })
  });

  test('Should handle error state on API failure', async () => {
    const { result } = renderHook(() => useFetch(wrongPokemonId));
    await waitFor(()=>{
        expect(result.current.isLoading).toBe(false)
        expect(result.current.hasError).toBe(true)
     })
  });



});
