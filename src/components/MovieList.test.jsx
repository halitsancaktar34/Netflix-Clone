import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import axios from "axios";
import MovieList from "./MovieList";

vi.mock("axios");

// Mock matchMedia
beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

const mockMovies = [
  {
    id: 1,
    poster_path: "/path1.jpg",
    title: "Movie 1",
  },
  {
    id: 2,
    poster_path: "/path2.jpg",
    title: "Movie 2",
  },
];

describe("MovieList Component Tests", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { results: mockMovies } });
  });

  it("renders genre title correctly", () => {
    const genre = { id: 28, name: "Action" };

    render(
      <MemoryRouter>
        <MovieList genre={genre} />
      </MemoryRouter>
    );

    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("fetches and displays movies correctly", async () => {
    const genre = { id: 28, name: "Action" };

    render(
      <MemoryRouter>
        <MovieList genre={genre} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole("img").length).toBe(mockMovies.length);
    });

    mockMovies.forEach((movie) => {
      const img = screen.getByAltText(movie.title);
      expect(img).toHaveAttribute(
        "src",
        `https://image.tmdb.org/t/p/original${movie.poster_path}`
      );
    });
  });

  it("renders links to movie details correctly", async () => {
    const genre = { id: 28, name: "Action" };

    render(
      <MemoryRouter>
        <MovieList genre={genre} />
      </MemoryRouter>
    );

    await waitFor(() => {
      mockMovies.forEach((movie) => {
        const link = screen.getByRole("link", { name: movie.title });
        expect(link).toHaveAttribute("href", `/detay/${movie.id}`);
      });
    });
  });
});
