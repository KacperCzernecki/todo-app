import { render, screen } from "@testing-library/react";
import App from "../App";
import { describe, it, expect } from "vitest";

describe("App component", () => {
  it("renders calendar on load", () => {
    render(<App />);
    const prevButton = screen.getByRole("button", { name: /prev/i });
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("renders calendar header with month", () => {
    render(<App />);
    const header = screen.getByRole("heading", { level: 2 });
    expect(header).toBeInTheDocument();
  });

  it("renders add button", () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: /\+/ });
    expect(addButton).toBeInTheDocument();
  });
});
