import { useRef } from "react";

export const FocusScreen = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const focusInput = () => {
        inputRef?.current?.select()
    }

    return (
        <>
            <h1>Focus screen</h1>
            <hr />
            <input
                ref={inputRef}
                type="text"
                placeholder="Insert your name"
                className="form-control"
            />

            <button className="btn btn-primary mt-2" onClick={() => focusInput()}>
                Set focus
            </button>
        </>
    )
}
