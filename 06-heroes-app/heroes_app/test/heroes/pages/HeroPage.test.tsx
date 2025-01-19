import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { HeroPage } from "@/heroes/pages/HeroPage";
import { getHeroById } from "@/heroes/helpers/getHeroById";

jest.mock("@/heroes/helpers/getHeroById");
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("HeroPage.test.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should show hero details if hero is found", () => {
    const mockHero = {
      id: "batman",
      superhero: "Batman",
      alter_ego: "Bruce Wayne",
      publisher: "DC Comics",
      first_appearance: "Detective Comics #27",
      characters: "Bruce Wayne",
    };

    (getHeroById as jest.Mock).mockReturnValue(mockHero);

    render(
      <MemoryRouter initialEntries={["/hero/batman"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Batman");
    expect(screen.getAllByText("Bruce Wayne").length).toBeGreaterThan(1);
    expect(screen.getByText("DC Comics")).toBeInTheDocument();
    expect(screen.getByText("Detective Comics #27")).toBeInTheDocument();
    expect(screen.getAllByText("Bruce Wayne").length).toBeGreaterThan(1);
  });
  test("Should navigate back when the 'Back' button is clicked", () => {
    const mockHero = {
      id: "batman",
      superhero: "Batman",
      alter_ego: "Bruce Wayne",
      publisher: "DC Comics",
      first_appearance: "Detective Comics #27",
      characters: "Bruce Wayne",
    };

    (getHeroById as jest.Mock).mockReturnValue(mockHero);

    render(
      <MemoryRouter initialEntries={["/hero/batman"]}>
        <Routes>
          <Route path="/hero/:id" element={<HeroPage />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button", { name: "Back" });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
  
});
