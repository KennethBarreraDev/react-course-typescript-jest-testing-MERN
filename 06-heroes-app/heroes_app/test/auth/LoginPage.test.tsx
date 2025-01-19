import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "@/globals/context/AuthContext";
import { useNavigate } from "react-router";
import { LoginPage } from "@/auth/LoginPage";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

describe("LoginPage.test.tsx", () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test("Should render correctly with default UI", () => {
    const user = { logged: false, name: "Kenneth" };
    render(
      <AuthContext.Provider value={{state:user, login:mockLogin, logout: jest.fn}}>
        <LoginPage />
      </AuthContext.Provider>
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThan(1);
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("Should call login and navigate on button click", () => {
    const user = { logged: false, name: "Kenneth" };
    render(
      <AuthContext.Provider value={{state:user, login:mockLogin, logout: jest.fn}}>
        <LoginPage />
      </AuthContext.Provider>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith("Osvaldo");
    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  });
});
