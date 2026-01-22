import "./App.css";
import { Calendar } from "./components/Calendar";

function App() {
  const unixToday = Math.floor(new Date().getTime() / 1000);
  return (
    <>
      <Calendar unixDate={unixToday} />
    </>
  );
}

export default App;
