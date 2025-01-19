import { AuthContext } from "@/globals/context/AuthContext";
import { AppRouter } from "@/router/AppRouter";
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router";

describe('AppRouter.test.tsx', () => {
  test('Should show login if user is not auth', () => {
    const user = { logged: false, name: "Kenneth" };
    render(
      <AuthContext.Provider value={{ state: user, login: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThan(1)
  })

  test('Should navigate if user is auth', () => {
    const user = { logged: true, name: "Kenneth" };
    render(
      <AuthContext.Provider value={{ state: user, login: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Marvel comics')).toBeInTheDocument();
  })

  
})