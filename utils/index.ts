import uuid from "react-native-uuid";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const capitalize = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formatDate = (date: Date) => {
  // Get relative date
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const time = Math.floor(date.getTime() / 1000);
  const now = Math.floor(Date.now() / 1000);
  let diff = now - time;

  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  while (diff > 60) {
    if (diff > 3600) {
      hours++;
      diff -= 3600;
    } else {
      minutes++;
      diff -= 60;
    }
  }

  seconds = diff;

  if (hours < 1 && minutes < 1) {
    return `Just now`;
  }
  if (hours < 1) {
    return `${minutes}min ago`;
  } else if (hours >= 1 && hours < 24) {
    return `${hours}h ago`;
  } else if (hours >= 24 && hours < 48) {
    return `Yesterday`;
  }

  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  return `${months[month]} ${day}, ${year}`;
};

export const generateUID = () => {
  return uuid.v4() as string;
};

export const generateColor = () => {
  const colors = [
    "#093044",
    "#14506c",
    "#2994bd",
    "#d84654",
    "#4f9d69",
    "#5b629a",
    "#706677",
    "#13262b",
    "#b80600",
    "#bd632f",
    "#0f0e1c",
    "#3aa99f",
    "#cc144b",
    "#2e2709",
    "#8a120b",
    "#72727e",
    "#468c81",
    "#267ce9",
    "#22181c",
    "#a4243b",
    "#668f80",
    "#3f37c9",
    "#7209b7",
    "#f72585",
    "#03045e",
    "#5390d9",
    "#780000",
    "#ff6b35",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
