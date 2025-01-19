import { useLayoutEffect, useRef, useState } from "react";

type PokemonInfo = {
    id: number,
    name: string,
    sprites: string[]
}

export const PokemonCard = ({ id, name, sprites }: PokemonInfo) => {

    const headingRef = useRef<HTMLHeadingElement>(null);
    const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(
        () => {
            const { height, width } = headingRef.current!.getBoundingClientRect()
            console.log(height, width);
            setBoxSize({ height, width })

        },
        []
    )

    return (
        <section style={{ height: 200, display: 'flex', flexDirection: 'row' }}>
            <h1 ref={headingRef} className="text-capitalize"># {id}-{name}</h1>
            {
                sprites.map((sprite) =>
                    <img src={sprite} key={sprite} />
                )
            }
            <pre>{JSON.stringify(boxSize)}</pre>
        </section>
    )
}
