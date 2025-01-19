import { AuthStatus } from "@/store/auth/authSlice";

export const initialState = {
      status: AuthStatus.CHECKING,
        uuid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
}

export const authenticatedState = {
    status: AuthStatus.AUTHENTICATED,
      uuid: '123',
      email: 'prueba@mail.com',
      displayName: 'Kenneth',
      photoURL: 'http://img.png',
      errorMessage: null
}

export const notAuthenticatedState = {
    status: AuthStatus.NOT_AUTHENTICATED,
      uuid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null
}

export const demoUser = {
  uuid: '123',
  email: 'prueba@mail.com',
  displayName: 'Kenneth',
  photoURL: 'http://img.png',
}