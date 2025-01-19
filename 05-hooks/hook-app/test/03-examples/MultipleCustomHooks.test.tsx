import { fireEvent, render, screen } from "@testing-library/react";

import { MultipleCustomHooks } from "@/03-examples/MultipleCustomHooks";
import { useCounter } from "@/01-useState/hooks/useCounter";
import { useFetch } from "@/03-examples/hooks/useFetch";

// Mock de los hooks
jest.mock("@/01-useState/hooks/useCounter");
jest.mock("@/03-examples/hooks/useFetch");

describe("MultipleCustomHooks Component", () => {
    const mockIncrement = jest.fn();
    const mockDecrement = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useCounter as jest.Mock).mockReturnValue({
            CounterApp: 1,
            increment: mockIncrement,
            decrement: mockDecrement,
        });

        (useFetch as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            hasError: false,
        });
    });

    test("Should render LoadingMessage when isLoading is true", () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            hasError: false,
        });

        render(<MultipleCustomHooks />);
        expect(screen.getByText("MultipleCustomHooks")).toBeInTheDocument();
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("Should render error message when hasError is true", () => {
        (useFetch as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            hasError: true,
        });

        render(<MultipleCustomHooks />);
        expect(screen.getByText("An erro has occurred while loading pokemon")).toBeInTheDocument();
    });

    test("Should render PokemonCard when data is available", () => {
        const mockData = {
            id: 1,
            name: "Pikachu",
            sprites: {
                front_default: "front_default_url",
                front_shiny: "front_shiny_url",
                back_default: "back_default_url",
                back_shiny: "back_shiny_url",
            },
        };

        (useFetch as jest.Mock).mockReturnValue({
            data: mockData,
            isLoading: false,
            hasError: false,
        });

        render(<MultipleCustomHooks />);
        expect(screen.getByText("MultipleCustomHooks")).toBeInTheDocument();
        expect(screen.getByText("# 1-Pikachu")).toBeInTheDocument();
        expect(screen.getAllByRole("img").length).toBe(4);
    });

    test("Should call increment function when 'Next' button is clicked", () => {
        const mockData = {
            id: 1,
            name: "Pikachu",
            sprites: {
                front_default: "front_default_url",
                front_shiny: "front_shiny_url",
                back_default: "back_default_url",
                back_shiny: "back_shiny_url",
            },
        };

        (useFetch as jest.Mock).mockReturnValue({
            data: mockData,
            isLoading: false,
            hasError: false,
        })
        render(<MultipleCustomHooks />);
        const nextPageButton = screen.getByText('Next');
        fireEvent.click(nextPageButton)
        expect(mockIncrement).toHaveBeenCalled()
    });

    test("Should call increment function when 'Last' button is clicked", () => {
        const mockData = {
            id: 1,
            name: "Pikachu",
            sprites: {
                front_default: "front_default_url",
                front_shiny: "front_shiny_url",
                back_default: "back_default_url",
                back_shiny: "back_shiny_url",
            },
        };

        (useFetch as jest.Mock).mockReturnValue({
            data: mockData,
            isLoading: false,
            hasError: false,
        })
        render(<MultipleCustomHooks />);
        const lastPageButton = screen.getByText('Last');
        fireEvent.click(lastPageButton)
        expect(mockDecrement).toHaveBeenCalledTimes(1)
    });


});
