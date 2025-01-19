import React from "react";

type ChildParams = {
    number: number;
    increment: (num: number) => void; // Cambia el tipo de increment
};

export const Child = React.memo(({number, increment }: ChildParams) => {
    console.log('  Me volví a generar :(  ');
    return (
        <button
            className="btn btn-primary mr-3"
            onClick={ () => increment( number ) }>
            { number }
        </button>
    )
})
