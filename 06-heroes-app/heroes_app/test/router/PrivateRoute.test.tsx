import { render, screen } from "@testing-library/react";
import { AuthContext } from "@/globals/context/AuthContext";
import { MemoryRouter, Routes, Route } from "react-router";
import { PrivateRoute } from "@/router/PrivateRoute";

describe("PrivateRoute.test.tsx", () => {


  test("should render children if user is  logged in", () => {
    const user = { logged: true, name: "Kenneth" };
    render(
      <AuthContext.Provider value={{ state: user, login: jest.fn(), logout: jest.fn() }}>
        <PrivateRoute>
          <div>Private content</div>
        </PrivateRoute>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Private content")).toBeInTheDocument();
  });

  test("should navigate if user is NOT logged in", () => {
    const user = { logged: false, name: "Kenneth" };
    render(
      <AuthContext.Provider value={{ state: user, login: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/marvel" element={<h1>Marvel</h1>} />
          </Routes>
          <PrivateRoute>
            <div>Private content</div>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument()
    
  });


});


