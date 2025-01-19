import { useState, useEffect, useCallback } from "react";

export const useCustomForm = (initialForm: { [key: string]: string }, formValidations?: { [key: string]: [(value: string)=>boolean, string] } ) => {

    const [formState, setFormState] = useState<{ [key: string]: string }>()
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])

    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
    
        setFormState((state) => ({
            ...state,
            [inputName]: inputValue
        }));
        validateFormOnChange(inputName, inputValue);
    }, [errors]);
    
    const onResetForm = useCallback(() => {
        setFormState(initialForm)
    }, [])


    const validateFormSubmit = ()=>{
        for(const [key, value] of Object.entries(formState ?? {})){
            validateFormOnChange(key, value)
        }
    }

    const validateFormOnChange = (inputName: string, inputValue: string)=>{
        if (formValidations) {
            if (formValidations[inputName]) {
                const isValid = formValidations[inputName][0](inputValue);
                if (!isValid) {
                    setErrors((errors) => ({
                        ...errors,
                        [inputName]: formValidations[inputName][1]
                    }));
                } else {
                    setErrors((errors) => {
                        const { [inputName]: _, ...rest } = errors;
                        return rest;
                    });
                }
            }
        }
    }

    return {
        formState,
        onInputChange,
        onResetForm,
        validateFormSubmit,
        errors
    }
}
