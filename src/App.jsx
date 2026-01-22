import "./App.css";
import { Calendar } from "./components/Calendar";
import { useState } from "react";
import { getNextMonthUnix, getPrevMonthUnix } from "./dateHelpers";

function App() {
  const [tasks, setTasks] = useState(() => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  });
  const [currentUnix, setCurrentUnix] = useState(
    Math.floor(new Date().getTime() / 1000),
  );

  const updateTask = (taskId, updated) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((t) =>
        t.id === taskId ? { ...t, ...updated } : t,
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };
  const handleNextMonth = () => {
    setCurrentUnix((prev) => getNextMonthUnix(prev));
  };
  const handlePrevMonth = () => {
    setCurrentUnix((prev) => getPrevMonthUnix(prev));
  };

  return (
    <>
      <Calendar
        unixDate={currentUnix}
        tasks={tasks}
        updateTask={updateTask}
        handleNext={handleNextMonth}
        handlePrev={handlePrevMonth}
      />
    </>
  );
}

export default App;
