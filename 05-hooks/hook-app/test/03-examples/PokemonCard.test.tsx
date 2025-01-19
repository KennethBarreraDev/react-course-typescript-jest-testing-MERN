import { PokemonCard } from "@/03-examples/PokemonCard";
import { render, screen } from "@testing-library/react";

describe("PokemonCard Component", () => {
  const mockPokemon = {
    id: 1,
    name: "Pikachu",
    sprites: [
      "https://example.com/front.png",
      "https://example.com/shiny.png",
      "https://example.com/back.png",
    ],
  };

  test("Should render Pokemon name and id", () => {
    render(<PokemonCard id={mockPokemon.id} name={mockPokemon.name} sprites={mockPokemon.sprites} />);
    const heading = screen.getByText(`# ${mockPokemon.id}-${mockPokemon.name}`);
    expect(heading).toBeInTheDocument();
  });

  test("Should render correct number of images", () => {
    render(<PokemonCard id={mockPokemon.id} name={mockPokemon.name} sprites={mockPokemon.sprites} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(mockPokemon.sprites.length);
  });
});
