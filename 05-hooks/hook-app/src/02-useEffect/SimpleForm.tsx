import { useEffect, useState } from "react"
import { Message } from "./Message"

type User = {
    username: string,
    email: string
}


export const SimpleForm = () => {

    const [formState, setFormState] = useState<User>({
        username: 'kenneth',
        email: 'kenneth@mail.com'
    })

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        setFormState({
            ...formState,
            [inputName]: event.target.value
        })
    }

    const { username, email } = formState;
    
    useEffect(() => {
        console.log('Use effect call');
    }, [])
    useEffect(() => {
        console.log('Username has changed');
    }, [username])
    useEffect(() => {
        console.log('Email has changed');
    }, [email])

    return (
        <>
            <h1>Simple form</h1>
            <hr />
            <input
                type="text"
                className='form-control'
                placeholder='username'
                name='username'
                value={username}
                onChange={(event) => onInputChange(event)}
            />
            <input
                type="text"
                className='form-control mt-2'
                placeholder='email'
                name='email'
                value={email}
                onChange={(event) => onInputChange(event)}
            />

            {
                username === 'qubit' &&
                <Message />

            }

        </>
    )
}
