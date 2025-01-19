export const apiKey = 'YOUR_API_KEY'

export const request = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`)
    .then((response) => response.json())
    .then(({data})=>{
        const img = document.createElement('img')
        img.src = data.images.original.url;
        document.body.append(img)
    })
    .catch((error) => {
        throw error
    })


