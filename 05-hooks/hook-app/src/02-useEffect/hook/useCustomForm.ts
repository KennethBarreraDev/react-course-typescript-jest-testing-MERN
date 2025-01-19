import { useState, useEffect, useCallback } from "react";

export const useCustomForm = (initialForm: { [key: string]: any }) => {
    const [formState, setFormState] = useState<{ [key: string]: any }>()

    useEffect(() => {
        setFormState(initialForm);
    }, [])

    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        setFormState({
            ...formState,
            [inputName]: event.target.value
        })
    }, [])

    const onResetForm = useCallback(()=>{
        setFormState(initialForm)
    }, [])
    
    return {
        formState,
        onInputChange,
        onResetForm
    }
}
