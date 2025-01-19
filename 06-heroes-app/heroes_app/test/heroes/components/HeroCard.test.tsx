import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { HeroCard } from "@/heroes/components/HeroCard";
import { AllowedHeroPublisher, Hero } from "@/heroes/data/heroes";

describe("HeroCard.test.tsx", () => {
  const mockHero: Hero = {
    id: "batman",
    superhero: "Batman",
    alter_ego: "Bruce Wayne",
    first_appearance: "Detective Comics #27",
    characters: "Bruce Wayne",
    publisher: AllowedHeroPublisher.DC_COMICS,
  };

  test("Should render hero details correctly when alter_ego is the same as characters", () => {
    render(
      <MemoryRouter>
        <HeroCard hero={mockHero} />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("Batman");
    expect(screen.getAllByText("Bruce Wayne").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Detective Comics #27")).toBeInTheDocument();
  });
});
