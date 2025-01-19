import React from "react";

type ShowIncrementProps = {
    increment: (incrementValue: number) => void
}

export const ShowIncrement = React.memo(({ increment }: ShowIncrementProps) => {
    console.log('Rendering ShowIncrement');

    return (
        <button
            className="btn btn-primary"
            onClick={() => increment(2)}
        >
            Increment
        </button>
    )
})
