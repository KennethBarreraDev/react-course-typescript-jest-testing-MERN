import { render, screen } from "@testing-library/react";
import { DcPage } from "@/heroes/pages/DcPage";
import { HeroList } from "@/heroes/components/HeroList";
import { AllowedHeroPublisher } from "@/heroes/data/heroes";

jest.mock("@/heroes/components/HeroList", () => ({
  HeroList: jest.fn(() => <div data-testid="hero-list-mock"></div>),
}));

describe("DcPage.test.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should render correctly with the title and HeroList", () => {
    render(<DcPage />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Dc comics");
    expect(screen.getByTestId("hero-list-mock")).toBeInTheDocument();
    expect(HeroList).toHaveBeenCalledWith(
      { publisher: AllowedHeroPublisher.DC_COMICS },
      expect.anything()
    );
  });
});
