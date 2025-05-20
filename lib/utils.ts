import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a color string in hex format to rgba format
 * @param hex color string in hex
 * @param alpha
 * @returns
 */
export function hexToRgb(hex: string, alpha: number = 0.7): string {
  const match = hex.match(/\w\w/g);
  if (!match) throw new Error("Invalid hex color format");
  const [r, g, b] = match.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
