import { render, screen } from "@testing-library/react";
import { HelloWorldApp } from "../src/HelloWorldApp"; // Importa tu componente correctamente

describe("Hello world app", () => {
  test("Should render hello world in a h1", () => {
   
    render(<HelloWorldApp/>)
    expect(screen.getByRole('heading', {level: 1}).innerHTML).toContain('Hello world')
  });
});
