import { render, screen } from "@testing-library/react";
import { FirstApp } from "../src/FirstApp.tsx"; // Importa tu componente correctamente

describe("FirstApp Component", () => {
  const subtitle = 'First paragraph';
  const title = 'This is a title';
  test("Should do match with snapshot", () => {
    const {container} = render(<FirstApp subtitle={subtitle}/>)
    expect(container).toMatchSnapshot()
  });

  test("Should render subtitle", () => {
    render(<FirstApp subtitle={subtitle}/>)
    expect(screen.getByText(subtitle)).toBeTruthy();
  });

  test("Should render title in h1 tag", () => {
    render(<FirstApp subtitle={subtitle} title={title}/>)

    expect(screen.getByRole('heading', {level: 1}).innerHTML).toContain(title);
  });
});
