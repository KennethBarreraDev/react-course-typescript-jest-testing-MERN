import { LoadingMessage } from "@/03-examples/LoadingMessage";
import { render, screen } from "@testing-library/react";
LoadingMessage
describe("LoadingMessage.test.tsx", () => {
  test("Should render 'Loading...' message", () => {
    render(<LoadingMessage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
