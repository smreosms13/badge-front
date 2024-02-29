import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(input) {
  let date;

  if (typeof input === 'number' && !isNaN(input)) {
    date = new Date(input);
  } else if (typeof input === 'string') {
    date = new Date(input);
  } else {
    return input;
  }
  if (isNaN(date.getTime())) {
      return input; // return 'Invalid date';
    }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
