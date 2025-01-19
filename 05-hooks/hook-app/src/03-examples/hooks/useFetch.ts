import { useState, useEffect } from "react"

type FetchData = {
    isLoading: boolean,
    hasError: boolean,
    data: any,
    error: string | null
}

const cachedPokemons: { [key: string]: any } = {

};

export const useFetch = (id: string | number) => {

    const [state, setsSate] = useState<FetchData>({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    })

    const [localCache, setlocalCache] = useState(cachedPokemons)

    useEffect(() => {
        getFetch()
    }, [id])

    const getFetch = async () => {
        try {
            setsSate({
                ...state,
                isLoading: true
            })
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

            if (!(url in localCache)) {
                console.log('Fetching pokemon');
                const response = await fetch(url);
                const data = await response.json();
                setsSate({
                    ...state,
                    isLoading: false,
                    data: data
                })

                setlocalCache({
                    ...localCache,
                    [url]: data
                })
            }
            else {
                console.log('Getting pokemon from cache');
                setsSate({
                    ...state,
                    isLoading: false,
                    data: localCache[url]
                })

            }
        } catch (error) {
            setsSate({
                ...state,
                isLoading: false,
                hasError: true,
                error: `${error}`
            })
        }
    }


    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}
