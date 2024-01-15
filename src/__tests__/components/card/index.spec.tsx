import { fireEvent, render, screen } from "@testing-library/react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/card";

jest.mock("react-query");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../../services/api.ts", () => ({
  DogAPI: {
    getBreedImageByName: jest.fn(),
  },
}));

describe("components/card", () => {
  it("should render component with default props - create snapshot", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { message: "image-url" },
      isLoading: false,
    });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    const component = render(<Card name="bulldog" />);
    expect(component).toMatchSnapshot();
  });

  it("should render card with breed name", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { message: "image-url" },
      isLoading: false,
    });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    render(<Card name="bulldog" />);

    expect(screen.getByText("bulldog")).toBeInTheDocument();
    expect(screen.getByAltText("image-url")).toBeInTheDocument();
  });

  it("should navigate to breed page when clicked", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useQuery as jest.Mock).mockReturnValue({
      data: { message: "image-url" },
      isLoading: false,
    });

    render(<Card name="bulldog" />);

    fireEvent.click(screen.getByText("bulldog"));
    expect(navigate).toHaveBeenCalledWith("/breed/bulldog");
  });

  it("should render image when data is loaded", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { message: "image-url" },
      isLoading: true,
    });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    render(<Card name="bulldog" />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });
});
