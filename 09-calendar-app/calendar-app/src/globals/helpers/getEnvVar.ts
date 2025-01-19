export const getEnvsVariables = () =>{
    import.meta.env
    return {
        ...import.meta.env
    }
}