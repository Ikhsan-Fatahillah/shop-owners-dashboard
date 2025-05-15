
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateRange(start: Date, end: Date): string {
  return `${formatTime(start)} - ${formatTime(end)}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Function to create a gradient background style
export function getGradientBackground(
  startColor: string = "rgba(223,234,247,1)",
  endColor: string = "rgba(244,248,252,1)"
): React.CSSProperties {
  return {
    background: `linear-gradient(109.6deg, ${startColor} 11.2%, ${endColor} 91.1%)`,
  };
}
