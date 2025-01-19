import {loginWithEmail, signInWithEmail, getUserSession } from "@/firebase/auth_provider";
import { checkingCredentials, login, logout } from "@/store/auth/authSlice";
import { getNotesFromDB } from "@/store/journal/journalThunks";
import { AuthStatus } from "@/store/auth/authSlice";
import { startLoginWithEmail,  startUserRegister, getActiveUserSession } from "@/store/auth/authThunks";
import { demoUser } from "@/fixtures/authFixtures";

jest.mock("@/firebase/auth_provider");
jest.mock("@/store/journal/journalThunks", () => ({
  getNotesFromDB: jest.fn(),
}));

describe("authThunks tests", () => {
  const dispatch = jest.fn();
  const userPsssword = '1234567';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("startLoginWithEmail should authenticate user with email and password", async () => {

    (loginWithEmail as jest.Mock).mockResolvedValue({
        status: true,
        ...demoUser
    });

    await startLoginWithEmail(demoUser.email, userPsssword)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({
        status: AuthStatus.AUTHENTICATED,
        ...demoUser
      })
    );
  });

  test("startLoginWithEmail should handle login failure", async () => {
    const loginData = { status: false };

    (loginWithEmail as jest.Mock).mockResolvedValue(loginData);

    await startLoginWithEmail(demoUser.email, userPsssword)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({
        status: AuthStatus.NOT_AUTHENTICATED,
        errorMessage: "User or password incorrect",
      })
    );
  });

  test("startUserRegister should register and login user", async () => {
   
    const registerData = {
      status: true,
      ...demoUser
    };

    (signInWithEmail as jest.Mock).mockResolvedValue(registerData);

    await startUserRegister(demoUser.email, userPsssword, demoUser.displayName)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({
        status: AuthStatus.AUTHENTICATED,
        ...demoUser
      })
    );
  });

  test("startUserRegister should handle registration failure", async () => {
    const registerData = { status: false };

    (signInWithEmail as jest.Mock).mockResolvedValue(registerData);

    await startUserRegister(demoUser.email, userPsssword, demoUser.displayName)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({
        status: AuthStatus.NOT_AUTHENTICATED,
        errorMessage: "Error creating user",
      })
    );
  });

  test("getActiveUserSession should retrieve user session and fetch notes", async () => {
    const sessionData = {
      status: true,
      ...demoUser
    };

    (getUserSession as jest.Mock).mockResolvedValue(sessionData);
    const mockGetNotesThunk = jest.fn();
    (getNotesFromDB as jest.Mock).mockReturnValue(mockGetNotesThunk);

    await getActiveUserSession()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      login({
        status: AuthStatus.AUTHENTICATED,
        ...demoUser
      })
    );
    expect(mockGetNotesThunk).toHaveBeenCalledWith(dispatch);
  });

  test("getActiveUserSession should handle session retrieval failure", async () => {
    const sessionData = { status: false };

    (getUserSession as jest.Mock).mockResolvedValue(sessionData);

    await getActiveUserSession()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({
        status: AuthStatus.NOT_AUTHENTICATED,
        errorMessage: "Error fetching user",
      })
    );
  });

});
