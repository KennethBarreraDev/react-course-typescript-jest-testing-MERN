import { apiKey } from "./10-fetch-api";



    export const getGif = async() => {
        const request = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`);
        const {data} = await request.json()
        const img = document.createElement('img')
        img.src = data.images.original.url;
        document.body.append(img)
    }
