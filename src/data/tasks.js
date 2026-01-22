import { readableToUnix } from "../dateHelpers";

export const dbTasks = [
  {
    id: 1,
    title: "Zrobić zakupy",
    description: "Kup: Mleko, bułki, szynkę, ser, masło",
    deadline: readableToUnix("22-01-2026"),
    complete: false,
  },
  {
    id: 2,
    title: "Oddać projekt",
    description: "Oddaj projekt zaliczeniowy u Pana Niemczyka",
    deadline: readableToUnix("20-12-2025"),
    complete: false,
  },
  {
    id: 3,
    title: "Wizyta u dentysty",
    description: "Umówiona na godzinę 12:30",
    deadline: readableToUnix("20-12-2025 12:30"),
    complete: false,
  },
];
