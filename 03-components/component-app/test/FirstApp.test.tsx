import { render } from "@testing-library/react";
import { FirstApp } from "../src/FirstApp.tsx"; // Importa tu componente correctamente

describe("FirstApp Component", () => {
  test("Should render subtitle by test id", () => {
    const subtitle = 'First paragraph';
    const { getByText, getByTestId } = render(<FirstApp subtitle={subtitle} />);
    expect(getByText(subtitle)).toBeTruthy();

    expect(getByTestId('test-subtitle').innerHTML).toContain(subtitle)

    // const h2 = container.querySelector('h2')
    // expect(h2?.innerHTML).toContain(subtitle)
  });

  test("Should render subtitle by test id", () => {
    const title = 'This is a title';
    const subtitle = 'First paragraph';

    const { getByText, getByTestId } = render(<FirstApp subtitle={subtitle} title={title} />);
    expect(getByText(title)).toBeTruthy();
    expect(getByTestId('test-title').innerHTML).toContain(title)
  });
});
