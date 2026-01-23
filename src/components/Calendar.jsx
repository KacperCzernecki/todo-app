import { useMemo, useState } from "react";
import "./Calendar.css";
import { Details } from "./details";
import { AddButton } from "./AddButton";
import {
  getMonthDaysWithTasks,
  getReadableMonthFromUnix,
  isBeforeUnix,
  isTodayUnix,
} from "../dateHelpers";

export const Calendar = ({
  unixDate,
  tasks,
  updateTask,
  removeTask,
  handlePrev,
  handleNext,
}) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const maxDisplayedTasks = 2;
  const days = useMemo(
    () => getMonthDaysWithTasks(tasks, unixDate),
    [tasks, unixDate],
  );
  const showDetails = (day) => {
    setSelectedDay(day);
  };
  const hideDetails = () => {
    setSelectedDay(null);
  };
  const isBeforeToday = (unix) => {
    const today = Math.floor(new Date().getTime() / 1000);
    return isBeforeUnix(unix, today);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="prev" onClick={handlePrev} type="button">
          Prev
        </button>
        <h2>{getReadableMonthFromUnix(unixDate)}</h2>
        <button className="next" onClick={handleNext} type="button">
          Next
        </button>
      </div>
      <div className="calendar-grid">
        {days.map((d) => {
          const sortTaskByCompletion = d.tasks
            .sort((a, b) => a.complete - b.complete)
            .slice(0, maxDisplayedTasks);
          return (
            <div
              key={d.day}
              className={`calendar-day ${isBeforeToday(d.unix) && "passed"} ${isTodayUnix(d.unix) && "today"}`}
              onClick={() => showDetails(d)}
            >
              <span className="day-number">{d.day}</span>
              {d.tasks.length > maxDisplayedTasks && (
                <span className="more-tasks">
                  +{d.tasks.length - maxDisplayedTasks}
                </span>
              )}

              {sortTaskByCompletion.map((task) => (
                <div
                  key={task.id}
                  className={"task" + (task.complete ? " done" : "")}
                >
                  <h3>{task.title}</h3>
                </div>
              ))}
            </div>
          );
        })}
        <AddButton />
      </div>
      {selectedDay && (
        <Details
          day={selectedDay.day}
          unix={selectedDay.unix}
          tasks={selectedDay.tasks}
          onClose={hideDetails}
          updateTask={updateTask}
          removeTask={removeTask}
        />
      )}
    </div>
  );
};
