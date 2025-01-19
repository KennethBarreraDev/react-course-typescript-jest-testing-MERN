import { GifData } from "../helpers/GetGifs"

export const GifGridItem = ({id, title, url}: GifData) => {
  return (
    <div className="card">
        <img src={url} alt={title}/>
        <p id={id}>{title}</p>
    </div>
  )
}
