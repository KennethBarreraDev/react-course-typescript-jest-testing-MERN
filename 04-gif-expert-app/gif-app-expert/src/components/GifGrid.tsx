import { GifGridItem } from "./GifGridItem"
import { useFetchGifs } from "../hooks/useFetchGifs"

type Props = {
    category: string,
    
}
export const GifGrid = ({ category }: Props) => {

    const {images, isLoading} = useFetchGifs(category)


    return (
        <>
            <h3>{category}</h3>
            {
                isLoading ?
                    <h5>Loading...</h5>
                    : <div className="card-grid">
                        {
                            images.map((img) => <GifGridItem key={img.id}  id={img.id} title={img.title} url={img.url}/>)
                        }
                    </div>

            }
        </>
    )
}
