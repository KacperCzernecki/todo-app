const readableToUnix = (inputDate) => {
  const [date, time] = inputDate.split(" ");
  const [day, month, year] = date.split("-").map(Number);

  let dateObj;

  if (time) {
    const [hour, minute] = time.split(":").map(Number);
    dateObj = new Date(year, month - 1, day, hour, minute, 0);
  } else {
    dateObj = new Date(year, month - 1, day);
  }

  return Math.floor(dateObj.getTime() / 1000);
};

const unixToReadable = (unix) => {
  const date =
    unix.toString().length === 10 ? new Date(unix * 1000) : new Date(unix);

  const pad = (n) => n.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const getTasksForDay = (tasks, unixDay) => {
  const targetDate =
    unixDay.toString().length === 10
      ? new Date(unixDay * 1000)
      : new Date(unixDay);

  const sameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return tasks.filter((task) => {
    const taskDate =
      task.deadline.toString().length === 10
        ? new Date(task.deadline * 1000)
        : new Date(task.deadline);

    return sameDay(taskDate, targetDate);
  });
};
const getMonthDaysWithTasks = (tasks, unixDate) => {
  const baseDate = new Date(unixDate * 1000);

  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const dayDate = new Date(year, month, i + 1);
    dayDate.setHours(0, 0, 0, 0);
    const startOfDay = Math.floor(dayDate.getTime() / 1000);

    const dayTasks = tasks.filter(
      (task) => Math.floor(task.deadline) === startOfDay,
    );

    return {
      day: i + 1,
      tasks: dayTasks,
      unix: startOfDay,
    };
  });
};
const getReadableMonthFromUnix = (unixDate) => {
  const date =
    unixDate.toString().length === 10
      ? new Date(unixDate * 1000)
      : new Date(unixDate);
  const year = date.getFullYear();
  const monthName = date.toLocaleDateString("pl-PL", { month: "long" });

  return (
    monthName.charAt(0).toUpperCase() + monthName.slice(1) + " " + String(year)
  );
};
const getNextMonthUnix = (unixDate) => {
  const date = new Date(unixDate * 1000);
  const year = date.getFullYear();
  const month = date.getMonth();
  const nextMonthDate = new Date(year, month + 1, 1);
  nextMonthDate.setHours(0, 0, 0, 0);

  return Math.floor(nextMonthDate.getTime() / 1000);
};
const getPrevMonthUnix = (unixDate) => {
  const date = new Date(unixDate * 1000);
  const year = date.getFullYear();
  const month = date.getMonth();
  const nextMonthDate = new Date(year, month - 1, 1);
  nextMonthDate.setHours(0, 0, 0, 0);

  return Math.floor(nextMonthDate.getTime() / 1000);
};
export {
  readableToUnix,
  unixToReadable,
  getTasksForDay,
  getMonthDaysWithTasks,
  getReadableMonthFromUnix,
  getNextMonthUnix,
  getPrevMonthUnix,
};
