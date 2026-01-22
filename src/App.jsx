import "./App.css";
import { Calendar } from "./components/Calendar";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  });

  const updateTask = (taskId, updated) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updated } : t)),
    );
  };

  const unixToday = Math.floor(new Date().getTime() / 1000);
  return (
    <>
      <Calendar unixDate={unixToday} tasks={tasks} updateTask={updateTask} />
    </>
  );
}

export default App;
