import { useState, useEffect } from "react"
import { getGifs, GifData } from "../helpers/GetGifs"

export type FetchResponse = {
    images: GifData[],
    isLoading: boolean
}


export const useFetchGifs = (value: string): FetchResponse => {
    console.log('Entrando');
    
    const [images, setImages] = useState<GifData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    

    useEffect(() => {
       
        const fetchData = async () => {
            setIsLoading(true)
            const gifs = await getGifs(value)
            setImages(gifs)
            setIsLoading(false)
        }

        fetchData().catch((error) => {
            console.log(error);
        })

    }, [])

    return {
        images: images,
        isLoading: isLoading
    }
}
