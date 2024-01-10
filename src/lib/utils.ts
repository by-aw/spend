import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(input: string) {
  const parsedInput = Date.parse(input);
  var returnString = "";
  if (parsedInput > Date.now() - 86400) {
    returnString = "Today";
  } else if (parsedInput > Date.now() - 172800) {
    returnString = "Yesterday";
  } else if (parsedInput > Date.now() - 604800) {
    returnString = "This week";
  } else if (parsedInput > Date.now() - 2592000) {
    returnString = "This month";
  } else if (parsedInput > Date.now() - 31536000) {
    returnString = "This year";
  }
  returnString +=
    " " +
    new Date(input).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  return returnString;
}


export function formatDate(input: string): string {
  const parsedInput = new Date(input);
  let returnString = "";

  const today = new Date();

  if (
    parsedInput.getFullYear() === today.getFullYear() &&
    parsedInput.getMonth() === today.getMonth() &&
    parsedInput.getDate() === today.getDate()
  ) {
    returnString = "Today";
  } else if (
    parsedInput.getFullYear() === today.getFullYear() &&
    parsedInput.getMonth() === today.getMonth() &&
    parsedInput.getDate() === today.getDate() - 1
  ) {
    returnString = "Yesterday";
  } else if (
    parsedInput.getFullYear() === today.getFullYear() &&
    parsedInput.getMonth() === today.getMonth() &&
    parsedInput.getDate() >= today.getDate() - 7
  ) {
    returnString = "This week";
  } else if (
    parsedInput.getFullYear() === today.getFullYear() &&
    parsedInput.getMonth() === today.getMonth() &&
    parsedInput.getDate() >= today.getDate() - 14
  ) {
    returnString = "Last week";
  } else if (
    parsedInput.getFullYear() === today.getFullYear() &&
    parsedInput.getMonth() === today.getMonth() - 1
  ) {
    returnString = "This month";
  } else if (
    parsedInput.getFullYear() === today.getFullYear() &&
    parsedInput.getMonth() === today.getMonth() - 2
  ) {
    returnString = "Last month";
  } else if (
    parsedInput.getFullYear() === today.getFullYear() - 1
  ) {
    returnString = "Last year";
  } else {
    returnString = "More than a year ago";
  }

  return returnString + " at " + parsedInput.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
