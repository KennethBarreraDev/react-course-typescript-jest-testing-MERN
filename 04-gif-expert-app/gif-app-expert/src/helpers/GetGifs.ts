export type GifData = {
    id: string,
    title: string,
    url: string
}

const apiKey = 'YOUR_API_KEY'

export const getGifs = async (category: string):Promise<GifData[]> => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${category}&limit=10`
    const response = await fetch(url)
    const { data } = await response.json()

    const gifs = data.map((img: any) => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url,
    }));
    return gifs
}
