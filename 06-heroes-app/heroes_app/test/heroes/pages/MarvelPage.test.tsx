import { render, screen } from "@testing-library/react";
import { HeroList } from "@/heroes/components/HeroList";
import { AllowedHeroPublisher } from "@/heroes/data/heroes";
import { MarvelPage } from "@/heroes/pages/MarvelPage";

jest.mock("@/heroes/components/HeroList", () => ({
  HeroList: jest.fn(() => <div data-testid="hero-list-mock"></div>),
}));

describe("MarvelPage.test.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should render correctly with the title and HeroList", () => {
    render(<MarvelPage />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Marvel comics");
    expect(screen.getByTestId("hero-list-mock")).toBeInTheDocument();
    expect(HeroList).toHaveBeenCalledWith(
      { publisher: AllowedHeroPublisher.MARVEL_COMICS },
      expect.anything()
    );
  });
});
