import { useEffect } from 'react';
import { useAuthStore } from '../../globals/hooks/useAuthStore';
import { useCustomForm } from '../../globals/hooks/useCustomForm';
import { USER_STATUS } from '../../store/auth/authSlice';
import '../../styles/login.css';
import Swal from "sweetalert2";

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    userName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

const allFormFields = {
    ...loginFormFields,
    ...registerFormFields
}

export const LoginPage = () => {
    const {
        errorMessage,
        successMesage,
        startCreatingUser,
        status,
        startLogin,

    } = useAuthStore()
    const { formState, onInputChange } = useCustomForm(allFormFields);

    const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startLogin({ email: formState?.loginEmail || '', password: formState?.loginPassword || '' })
    }

    const onRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startCreatingUser({
            name: formState?.userName || '',
            email: formState?.registerEmail || '',
            password: formState?.registerPassword || ''
        })
    }

    useEffect(() => {
        if (errorMessage.length > 0) {
            Swal.fire('Auth error', errorMessage, 'error')
        }
    }, [errorMessage])

    useEffect(() => {
        if (successMesage.length > 0) {
            Swal.fire('Success creating user', errorMessage, 'success')
        }
    }, [successMesage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Sign in</h3>
                    <form onSubmit={(event) => loginSubmit(event)}>
                        <div className="form-group mb-2">
                            <input
                                aria-label='loginEmail'
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name='loginEmail'
                                value={formState?.loginEmail || ''}
                                onChange={(event) => onInputChange(event)}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                aria-label='loginPassword'
                                className="form-control"
                                placeholder="Password"
                                name='loginPassword'
                                value={formState?.loginPassword || ''}
                                onChange={status == USER_STATUS.CHECKING ? undefined : (event) => onInputChange(event)}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                aria-label='login-button'
                                type="submit"
                                className="btnSubmit"
                                value={status == USER_STATUS.CHECKING ? "Loading..." : 'Login'}
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sign up</h3>
                    <form onSubmit={(event) => onRegisterSubmit(event)}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full name"
                                name='userName'
                                aria-label='userName'
                                value={formState?.userName || ''}
                                onChange={(event) => onInputChange(event)}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                aria-label='registerEmail'
                                name='registerEmail'
                                value={formState?.registerEmail || ''}
                                onChange={(event) => onInputChange(event)}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='registerPassword'
                                aria-label='registerPassword'
                                value={formState?.registerPassword || ''}
                                onChange={(event) => onInputChange(event)}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password"
                                name='registerPassword2'
                                aria-label='registerPassword2'
                                value={formState?.registerPassword2 || ''}
                                onChange={(event) => onInputChange(event)}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                aria-label='register-button'
                                type="submit"
                                className="btnSubmit"
                                value={status == USER_STATUS.CHECKING ? "Loading..." : 'Create an account'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}