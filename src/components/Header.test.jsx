import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Header from "./Header";

describe("Header Component Tests", () => {
  it("renders the header correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg");
    expect(logo).toHaveStyle("max-width: 150px");
  });

  it("renders the link wrapping the logo correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
