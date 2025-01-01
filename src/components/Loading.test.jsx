import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "./Loading";

describe("Loading Component Tests", () => {
  it("renders the loading message", () => {
    render(<Loading />);

    const loadingElement = screen.getByText("Loading");
    expect(loadingElement).toBeInTheDocument();
  });
});
