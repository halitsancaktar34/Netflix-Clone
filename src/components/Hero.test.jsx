import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, it, beforeEach, expect } from "vitest";
import Hero from "./Hero";

const mockStore = configureStore();

describe("Hero Component Tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      isMovieLoading: false,
      isMoviesLoading: false,
      popularMovies: [],
    });
  });

  it("renders the Loading component when movies are still loading", () => {
    store = mockStore({
      isMovieLoading: true,
      isMoviesLoading: true,
      popularMovies: [],
    });

    render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("renders Loading component if no random movie is selected", () => {
    store = mockStore({
      isMovieLoading: false,
      isMoviesLoading: false,
      popularMovies: [],
    });

    render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
