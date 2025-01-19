//Using typescript types instead of proptypes
type NewMessage = {
    message: string,
    title: string
}

type Properties = {
    title?: string,
    subtitle: string
}

//Homework, return value from function
const returnMessage = (): NewMessage => {
    return {
        message: 'Hello world',
        title: 'A simple message'
    }
}

export const FirstApp = ({ title='Probe title', subtitle}: Properties) => {
    return (
        <>
            <h1 data-testid='test-title'>{title}</h1>
            <h2 data-testid='test-subtitle'>{subtitle}</h2>
            <h3>{JSON.stringify(returnMessage())}</h3>
        </>
    )
}

