import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function formatThreadCount(count: number): string {
  if (count === 0) {
    return "No Threads";
  } else {
    const threadCount = count.toString().padStart(2, "0");
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}

export const getTimestamp = (createdAt: string | number | Date): string => {
  createdAt = new Date(createdAt);
  if (!createdAt) {
    return "";
  }
  createdAt = new Date(createdAt);

  const now = new Date();
  const secondsPast = (now.getTime() - createdAt.getTime()) / 1000;

  if (secondsPast < 60) {
    return Math.round(secondsPast) + " seconds ago";
  }

  const minutesPast = secondsPast / 60;
  if (minutesPast < 60) {
    return Math.round(minutesPast) + " minutes ago";
  }

  const hoursPast = minutesPast / 60;
  if (hoursPast < 24) {
    return Math.round(hoursPast) + " hours ago";
  }

  const daysPast = hoursPast / 24;
  if (daysPast < 7) {
    return Math.round(daysPast) + " days ago";
  }

  const weeksPast = daysPast / 7;
  if (weeksPast < 5) {
    return Math.round(weeksPast) + " weeks ago";
  }

  const monthsPast = daysPast / 30;
  if (monthsPast < 12) {
    return Math.round(monthsPast) + " months ago";
  }

  const yearsPast = daysPast / 365;
  return Math.round(yearsPast) + " years ago";
};

export function formatNumberShort(num: number): string {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(1).replace(rx, "$1") + item.symbol
    : "0";
}
