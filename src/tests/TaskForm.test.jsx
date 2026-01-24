import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AddTaskForm } from "../components/AddTaskForm";
import { vi } from "vitest";

vi.mock("react-datepicker", () => {
  return {
    default: (props) => {
      return (
        <input
          data-testid="date-picker"
          type="date"
          value={props.selected.toISOString().split("T")[0]}
          onChange={(e) => props.onChange(new Date(e.target.value))}
        />
      );
    },
  };
});

describe("AddTaskForm", () => {
  it("powinien wywołać addTask z poprawnymi danymi po submitcie", () => {
    const addTaskMock = vi.fn();
    const onCloseMock = vi.fn();
    const day = Math.floor(Date.now() / 1000);

    render(
      <AddTaskForm day={day} addTask={addTaskMock} onClose={onCloseMock} />,
    );

    const titleInput = screen.getByLabelText(/Task Title:/i);
    fireEvent.change(titleInput, { target: { value: "Nowy Task" } });

    const descriptionInput = screen.getByLabelText(/Task Description:/i);
    fireEvent.change(descriptionInput, { target: { value: "Opis zadania" } });

    const dateInput = screen.getByTestId("date-picker");
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 1); // następny dzień
    fireEvent.change(dateInput, {
      target: { value: newDate.toISOString().split("T")[0] },
    });

    const submitButton = screen.getByText(/Dodaj zadanie/i);
    fireEvent.click(submitButton);

    expect(addTaskMock).toHaveBeenCalledTimes(1);
    const calledWith = addTaskMock.mock.calls[0];
    expect(calledWith[0]).toBe("Nowy Task");
    expect(calledWith[1]).toBe("Opis zadania");
    const calledDeadline = calledWith[2];

    const expectedDate = new Date(newDate);
    expectedDate.setHours(0, 0, 0, 0);

    const calledDate = new Date(calledDeadline * 1000);
    calledDate.setHours(0, 0, 0, 0);

    expect(calledDate.getTime()).toBe(expectedDate.getTime());
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
