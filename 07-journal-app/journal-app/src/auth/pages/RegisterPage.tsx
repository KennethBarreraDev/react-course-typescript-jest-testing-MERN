import { Alert, Button, Grid2, TextField } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useCustomForm } from "../../globals/hooks/useForm";
import React from "react";
import { startUserRegister } from "../../store/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AuthStatus } from "../../store/auth/authSlice";


const initialFormState = { 'fullName': '', 'email': '', 'password': '' };
export const RegisterPage = React.memo(() => {


  const formValidations: { [key: string]: [(value: string) => boolean, string] } = {
    email: [(value: string) => value.includes('@'), 'Please, write a valid email'],
    fullName: [(value: string) => value.length > 0, 'Please, write a valid name'],
    password: [(value: string) => value.length > 6, 'Please, write a valid password']
  }

  const { formState, onInputChange, errors } = useCustomForm(initialFormState, formValidations);

  const dispatch = useDispatch();
  const loginStatus = useSelector((state: RootState) => state.auth.status)
  const errorMessage = useSelector((state: RootState) => state.auth.errorMessage)


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userThunk = startUserRegister(formState!.email, formState!.password, formState!.fullName);
    userThunk(dispatch)
  }

  return (
    <AuthLayout descriptor="Sign in">
      <form onSubmit={(event) => onSubmit(event)} role="form">

        <Grid2 container>
          <Grid2 size={12}>
            <TextField
              error={((errors ?? {})['fullName'] != undefined)}
              helperText={((errors ?? {})['fullName'] || '')}
              label="Full name"
              type="text"
              name="fullName"
              placeholder="Jhon doe"
              value={(formState ?? {})['fullName'] || ''}
              onChange={(event) => onInputChange(event)}

              fullWidth
            />
          </Grid2>
          <Grid2 size={12} sx={{ mt: 2 }}>
            <TextField
              error={((errors ?? {})['email'] != undefined)}
              helperText={((errors ?? {})['email'] || '')}
              label="email"
              type="email"
              name="email"
              placeholder="mail@mail.com"
              value={(formState ?? {})['email'] || ''}
              onChange={(event) => onInputChange(event)}
              fullWidth
            />
          </Grid2>

          <Grid2 size={12} sx={{ mt: 2 }}>
            <TextField
              error={((errors ?? {})['password'] != undefined)}
              helperText={((errors ?? {})['password'] || '')}
              label="password"
              type="password"
              name="password"
              placeholder="****"
              value={(formState ?? {})['password'] || ''}
              onChange={(event) => onInputChange(event)}

              fullWidth
            />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} sx={{ mt: 2 }}>
          <Grid2 size={12} sx={{ mb: 2 }}>
            <Button type="submit" variant="contained" fullWidth disabled={loginStatus==AuthStatus.CHECKING ? true : false}>
              register
            </Button>
          </Grid2>
        </Grid2>
        {
          (errorMessage!=null) &&
          <Grid2 container>
          <Grid2 size={12}>
            <Alert severity="error">{errorMessage ?? ''}</Alert>
          </Grid2>
        </Grid2>
        }
      </form>

    </AuthLayout>
  )
})
