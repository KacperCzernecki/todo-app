import { render, screen } from "@testing-library/react";
import { Calendar } from "../components/Calendar";
import { describe, it, expect } from "vitest";

describe("Calendar component", () => {
  const mockTasks = [];
  const mockHandlers = {
    updateTask: () => {},
    removeTask: () => {},
    handleNext: () => {},
    handlePrev: () => {},
  };

  it("renders calendar grid", () => {
    render(
      <Calendar
        unixDate={Math.floor(new Date().getTime() / 1000)}
        tasks={mockTasks}
        {...mockHandlers}
      />,
    );
    const grid = document.querySelector(".calendar-grid");
    expect(grid).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(
      <Calendar
        unixDate={Math.floor(new Date().getTime() / 1000)}
        tasks={mockTasks}
        {...mockHandlers}
      />,
    );
    expect(screen.getByRole("button", { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("renders month heading", () => {
    render(
      <Calendar
        unixDate={Math.floor(new Date().getTime() / 1000)}
        tasks={mockTasks}
        {...mockHandlers}
      />,
    );
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
