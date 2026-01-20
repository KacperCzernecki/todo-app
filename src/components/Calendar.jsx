import { useState } from "react";
import { tasks } from "../data/tasks";
import "./Calendar.css";
import { Details } from "./Details";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const maxDisplayedTasks = 2;
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrev = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };
  const handleNext = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };
  const getTasksForDay = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((tasks) => tasks.deadline === dateString);
  };
  const showDetails = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDay(dateString);
  };
  const hideDetails = () => {
    setSelectedDay(null);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="prev" onClick={handlePrev} type="button">
          Prev
        </button>
        <h2>
          {currentDate.toLocaleDateString("pl-PL", { month: "long" })} {year}
        </h2>
        <button className="next" onClick={handleNext} type="button">
          Next
        </button>
      </div>
      <div className="calendar-grid">
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const dayTasks = getTasksForDay(day);
          const formatedMonth = String(month + 1).padStart(2, "0");
          const formatedDay = String(day).padStart(2, "0");
          const dayPassed =
            Date.parse(`${year}-${formatedMonth}-${formatedDay}`) -
              Date.parse(new Date()) <
            0;
          const dayToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

          return (
            <div
              key={day}
              className={
                "calendar-day" +
                (dayToday ? " today" : dayPassed ? " passed" : "")
              }
              onClick={() => showDetails(day)}
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
      {selectedDay && <Details date={selectedDay} onClose={hideDetails} />}
    </div>
  );
};
