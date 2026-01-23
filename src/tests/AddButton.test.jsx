import { render, screen } from "@testing-library/react";
import { AddButton } from "../components/AddButton";
import { describe, it, expect } from "vitest";

describe("AddButton component", () => {
  it("renders add button", () => {
    render(<AddButton />);
    const button = screen.getByRole("button", { name: /\+/ });
    expect(button).toBeInTheDocument();
  });

  it("has correct title attribute", () => {
    render(<AddButton />);
    const button = screen.getByRole("button", { name: /\+/ });
    expect(button).toHaveAttribute("title", "Dodaj nowe zadanie");
  });
});
