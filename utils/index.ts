export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const capitalize = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export const formatDate = (date: Date) => {
  console.log({date});

  // Get relative date
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let time = date.getTime();

  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  while (time > 60) {
    if (time > 3600) {
      hours++;
      time -= 3600;
    } else {
      minutes++;
      time -= 60;
    }
  }

  seconds = time;

  if (hours < 1 && minutes < 1) {
    return `Just now`;
  } if (hours < 1) {
    return `${minutes}min ago`;
  } else if (hours >= 1 && hours < 24) {
    return `${hours}h ago`;
  } else if (hours >= 24 && hours < 48) {
    return `Since Yesterday`;
  }

  return `${day}/${month}/${year}`;
}