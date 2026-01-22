import { useMemo } from "react";
import { dbTasks } from "../data/tasks";
import "./Calendar.css";
import { AddButton } from "./AddButton";
import { getMonthDaysWithTasks } from "../dateHelpers";

export const Calendar = ({ unixDate }) => {
  const maxDisplayedTasks = 2;
  const days = useMemo(
    () => getMonthDaysWithTasks(dbTasks, unixDate),
    [dbTasks, unixDate],
  );
  const handlePrev = () => {};
  const handleNext = () => {};
  const showDetails = () => {};
  const hideDetails = () => {};

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="prev" onClick={handlePrev} type="button">
          Prev
        </button>
        <h2></h2>
        <button className="next" onClick={handleNext} type="button">
          Next
        </button>
      </div>
      <div className="calendar-grid">
        {days.map((d) => {
          return (
            <div
              key={d.day}
              className={"calendar-day"}
              onClick={() => showDetails(d)}
            >
              <span className="day-number">{d.day}</span>
              {/* {dayTasks.length > maxDisplayedTasks && (
                <span className="more-tasks">
                  +{dayTasks.length - maxDisplayedTasks}
                </span>
              )} */}

              {d.tasks.slice(0, maxDisplayedTasks).map((task) => (
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
      {/* {selectedDay && <Details date={selectedDay} onClose={hideDetails} />} */}
    </div>
  );
};
