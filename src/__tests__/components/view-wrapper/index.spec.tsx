import { fireEvent, render, screen } from "@testing-library/react";
import { ViewWrapper } from "../../../components/view-wrapper";

describe("components/view-wrapper", () => {
  it("should render component with default props - create snapshot", () => {
    const component = render(
      <ViewWrapper loading={false} noResults={true}>
        <div>Test</div>
      </ViewWrapper>
    );

    expect(component).toMatchSnapshot();
  });

  it("should render loading state", () => {
    render(
      <ViewWrapper loading={true} noResults={false}>
        Children
      </ViewWrapper>
    );

    expect(screen.getByText("Cargando... 🐶")).toBeInTheDocument();
  });

  it("should render no results state", () => {
    render(
      <ViewWrapper loading={false} noResults={true}>
        Children
      </ViewWrapper>
    );

    expect(
      screen.getByText("No se encontraron resultados.")
    ).toBeInTheDocument();
  });

  it("should render children when not loading and results exist", () => {
    render(
      <ViewWrapper loading={false} noResults={false}>
        Children
      </ViewWrapper>
    );

    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  it("should render refetch button and call refetch function when clicked", () => {
    const refetch = jest.fn();
    render(
      <ViewWrapper loading={false} noResults={false} refetch={refetch}>
        Children
      </ViewWrapper>
    );

    fireEvent.click(screen.getByText("Volver a buscar"));
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
