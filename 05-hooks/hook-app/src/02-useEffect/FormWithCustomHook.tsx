import { useCustomForm } from "./hook/useCustomForm"


export const FormWithCustomHook = () => {

    const { formState, onInputChange, onResetForm} = useCustomForm({
        username: 'Kenneth',
        email: 'kenneth@mail.com',
        password: 123
    });

    return (
        <>
            <h1>Form with custom hook</h1>
            <hr />
            <input
                type="text"
                className='form-control'
                placeholder='username'
                name='username'
                value={formState?.username || ''}
                onChange={(event) => onInputChange(event)}
            />
            <input
                type="text"
                className='form-control mt-2'
                placeholder='email'
                name='email'
                value={formState?.email || ''}
                onChange={(event) => onInputChange(event)}
            />

            <input
                type="text"
                className='form-control mt-2'
                placeholder='password'
                name='password'
                value={formState?.password || ''}
                onChange={(event) => onInputChange(event)}
            />

            <button className="btn btn-primary mt-2" onClick={()=>onResetForm()}>Reset</button>
        </>
    )
}
