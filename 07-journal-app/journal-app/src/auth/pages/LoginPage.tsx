import { Google } from "@mui/icons-material";
import { Alert, Button, Grid2, TextField, Typography } from "@mui/material";
import { Link } from "react-router";
import { AppRoutes } from "../../globals/routes";
import { AuthLayout } from "../layout/AuthLayout";
import { useCustomForm } from "../../globals/hooks/useForm";
import React from "react";
import { startLoginWithEmail, startGoogleLogin } from "../../store/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AuthStatus } from "../../store/auth/authSlice";

const initialFormState = { 'email': '', 'password': '' };
export const LoginPage = React.memo(() => {

  const { formState, onInputChange } = useCustomForm(initialFormState);

  const loginStatus = useSelector((state: RootState) => state.auth.status)
  const errorMessage = useSelector((state: RootState) => state.auth.errorMessage)
  const dispatch = useDispatch();

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginUserThunk = startLoginWithEmail((formState ?? {}).email || '', (formState ?? {}).password ?? '')
    loginUserThunk(dispatch)
  };

  const onGoogleSignIn = () => {
    const startGoogleThunk = startGoogleLogin();
    startGoogleThunk(dispatch)
  }

  return (
    <AuthLayout descriptor="Login">
      <form onSubmit={(event) => onSubmitForm(event)} role="form">
        <Grid2 container>
          <Grid2 size={12}>
            <TextField 
              label="email"
              type="email"
               name="email"
              value={(formState ?? {})['email'] || ''}
              placeholder="mail@mail.com"
              fullWidth
              onChange={(event) => onInputChange(event)}
            />
          </Grid2>

          <Grid2 size={12} sx={{ mt: 2 }}>
            <TextField
              name="password"
              label="password"
              type="password"
              aria-label="password-input"
              value={(formState ?? {})['password'] || ''}
              placeholder="****"
              fullWidth
              onChange={(event) => onInputChange(event)}
            />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={6} sx={{ mb: 2 }}>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Grid2>

          <Grid2 size={6} sx={{ mb: 2 }}>
            <Button aria-label="google-sign-in" variant="contained" fullWidth onClick={() => onGoogleSignIn()} disabled={loginStatus == AuthStatus.CHECKING ? true : false}>
              <Google />
              <Typography sx={{ ml: 1 }}>Login</Typography>
            </Button>
          </Grid2>
        </Grid2>


        <Grid2 container direction='row' justifyContent='end'>
          <Link to={`/${AppRoutes.auth}/${AppRoutes.register}`}>
            Create an account
          </Link>
        </Grid2>


        {
          (errorMessage != null) &&
          <Grid2 container>
            <Grid2 size={12}>
              <Alert severity="error">{errorMessage ?? ''}</Alert>
            </Grid2>
          </Grid2>
        }
      </form>

    </AuthLayout>
  );
}
)