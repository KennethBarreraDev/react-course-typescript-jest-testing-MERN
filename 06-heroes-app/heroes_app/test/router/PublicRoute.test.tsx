import { render, screen } from "@testing-library/react";
import { AuthContext } from "@/globals/context/AuthContext";
import { PublicRoute } from "@/router/PublicRoute";
import { MemoryRouter, Routes, Route } from "react-router";

describe("PublicRoute.test.tsx", () => {


  test("should render children if user is NOT logged in", () => {
    const user = { logged: false, name: "Kenneth" };
    render(
      <AuthContext.Provider value={{ state: user, login: jest.fn(), logout: jest.fn() }}>
        <PublicRoute>
          <div>Public content</div>
        </PublicRoute>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Public content")).toBeInTheDocument();
  });

  test("should navigate if user is logged in", () => {
    const user = { logged: true, name: "Kenneth" };
    render(
      <AuthContext.Provider value={{ state: user, login: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/marvel" element={<h1>Marvel</h1>} />
          </Routes>
          <PublicRoute>
            <div>Public content</div>
          </PublicRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Marvel')).toBeInTheDocument()
    
  });


});


