import { memo } from "react";

type SmallCounterProps = {
    counterValue: number;
};

export const SmallCounter = memo(({ counterValue }: SmallCounterProps) => {
    console.log('Rendering element');
    return <small data-testid='counter-test'>{counterValue}</small>;
})
