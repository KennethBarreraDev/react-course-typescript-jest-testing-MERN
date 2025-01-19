import { useState } from "react"
import { AddCategory } from "./components/AddCategory";
import { GifGrid } from "./components/GifGrid";

export const GifExpertApp = () => {
    console.log('Entering to component');

    const [categories, setcategories] = useState<string[]>([])

    const onAddCategory = (value: string): void => {

        if (categories.includes(value)) {
            alert('Category is already in array');
            return;
        }
        setcategories([value, ...categories])
    }

    

    return (
        <>
            <h1>GifExpertApp</h1>
            <AddCategory onAddCategory={onAddCategory} />
            <button>Add</button>
            {
                categories.map((category) =>
                    <GifGrid key={category} category={category} />
                )
            }
        </>
    )
}
