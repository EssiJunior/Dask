export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const capitalize = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formatDate = (date: Date) => {
  console.log({ date });

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
  } if (hours < 1) {
    return `${minutes}min ago`;
  } else if (hours >= 1 && hours < 24) {
    return `${hours}h ago`;
  } else if (hours >= 24 && hours < 48) {
    return `Since Yesterday`;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novemeber",
    "December",
  ];

  return `Since ${months[month]} ${day}, ${year}`;
};
