import { Navbar } from "@/globals/components/NavBar";
import { AuthContext } from "@/globals/context/AuthContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: jest.fn(),
}));

describe('NavBar.test.tsx', () => {
    const logoutFunction = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    test('Should render username in navbar ', () => {
        const user = { logged: true, name: "Kenneth" };
        render(
            <AuthContext.Provider value={{ state: user, login: jest.fn(), logout: logoutFunction }}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(user.name)).toBeInTheDocument();
    });

    test('Should call logout function ', () => {
        const user = { logged: true, name: "Kenneth" };
        render(
            <AuthContext.Provider value={{ state: user, login: jest.fn(), logout: logoutFunction }}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        const logoutButton = screen.getByRole('button');
        fireEvent.click(logoutButton);
        expect(logoutFunction).toHaveBeenCalledTimes(1);
    });

    test('Should navigate to login on logout ', () => {
        const user = { logged: true, name: "Kenneth" };
        render(
            <AuthContext.Provider value={{ state: user, login: jest.fn(), logout: logoutFunction }}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        const logoutButton = screen.getByRole('button');
        fireEvent.click(logoutButton);
        expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
});
