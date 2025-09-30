import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^W]+/g, "").replace(/ +/g, "-");
  // converts next js to next-js  ( user might type something like this so we take care of it,)
}
