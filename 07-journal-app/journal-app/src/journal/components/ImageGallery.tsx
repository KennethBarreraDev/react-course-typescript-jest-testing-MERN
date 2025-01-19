import { ImageList, ImageListItem } from "@mui/material";

interface ImageGalleryProps {
    images: string[]
}


export const ImageGallery = ({images}: ImageGalleryProps) => {
    console.log(images);
    
    return (
        <ImageList sx={{ width: '100%', height: 500 }} cols={5} rowHeight={164}>
            {images.map((img) => (
                <ImageListItem key={img}>
                    <img
                        srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${img}?w=164&h=164&fit=crop&auto=format`}
                        alt={img}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

