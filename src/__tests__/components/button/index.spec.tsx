import { Button } from "../../../components/button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("components/button", () => {
  it("should render component with default props - create snapshot", () => {
    const component = render(<Button>Click me</Button>);
    expect(component).toMatchSnapshot();
  });

  it("should render button with default variant", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-500");
  });

  it("should render button with outlined variant", () => {
    render(<Button variant="outlined">Click me</Button>);

    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-transparent");
  });

  it("should call onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: /Click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
