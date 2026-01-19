import { useState } from "react";
import { tasks } from "../data/tasks";
import "./Calendar.css";

export const Calendar = () => {
  const [currentDate] = useState(new Date());

  const maxDisplayedTasks = 2;
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getTasksForDay = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((tasks) => tasks.deadline === dateString);
  };

  return (
    <div className="calendar">
      <h2>
        {currentDate.toLocaleDateString("pl-PL", { month: "long" })} {year}
      </h2>

      <div className="calendar-grid">
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const dayTasks = getTasksForDay(day);
          const formatedMonth = String(month + 1).padStart(2, "0");
          const formatedDay = String(day).padStart(2, "0");
          const dayPassed =
            Date.parse(`${year}-${formatedMonth}-${formatedDay}`) -
              Date.parse(currentDate) <
            0;
          return (
            <div
              key={day}
              className={"calendar-day" + (dayPassed ? " passed" : "")}
            >
              <span className="day-number">{day}</span>
              {dayTasks.length > maxDisplayedTasks && (
                <span className="more-tasks">
                  +{dayTasks.length - maxDisplayedTasks}
                </span>
              )}

              {dayTasks.slice(0, maxDisplayedTasks).map((task) => (
                <div key={task.id} className="task">
                  <h3>{task.title}</h3>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
