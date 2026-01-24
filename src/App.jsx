import "./App.css";
import { Calendar } from "./components/Calendar";
import { useState } from "react";
import { getNextMonthUnix, getPrevMonthUnix } from "./dateHelpers";

function App() {
  const [counterId, setCounterId] = useState(() => {
    const count = localStorage.getItem("counter");
    return count ? Number(count) : 0;
  });
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
  const addTask = (title, description, deadline) => {
    setCounterId((prev) => {
      const newId = prev + 1;
      localStorage.setItem("counter", String(newId));
      return newId;
    });

    setTasks((prevTasks) => {
      const newTask = {
        id: counterId + 1, // albo użyj closure newId
        title,
        description,
        deadline,
        complete: false,
      };
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const removeTask = (taskId) => {
    setTasks((prev) => {
      const remainingTasks = prev.filter((t) => t.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(remainingTasks));
      return remainingTasks;
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
        removeTask={removeTask}
        handleNext={handleNextMonth}
        handlePrev={handlePrevMonth}
        addTask={addTask}
      />
    </>
  );
}

export default App;
