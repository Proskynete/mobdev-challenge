import { fireEvent, render, screen } from "@testing-library/react";
import { Select } from "../../../components/select";

describe("components/select", () => {
  it("should render component with default props - create snapshot", () => {
    const component = render(<Select options={["Option 1", "Option 2"]} />);

    expect(component).toMatchSnapshot();
  });

  it("should render select with provided default label", () => {
    render(
      <Select
        defaultLabel="Selecciona una opción"
        options={["Option 1", "Option 2"]}
      />
    );

    expect(screen.getByText("Selecciona una opción")).toBeInTheDocument();
  });

  it("should render provided options", () => {
    render(<Select options={["Option 1", "Option 2"]} />);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("should render provided options with labels", () => {
    render(
      <Select
        options={[
          ["Label 1", ["Option 1"]],
          ["Label 2", ["Option 2"]],
        ]}
      />
    );

    expect(screen.getByText("Label 1")).toBeInTheDocument();
    expect(screen.getByText("Label 2")).toBeInTheDocument();
  });

  it("should call onChange when an option is selected", () => {
    const handleChange = jest.fn();
    render(
      <Select options={["Option 1", "Option 2"]} onChange={handleChange} />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Option 1" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
