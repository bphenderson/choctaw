// Color utilities
export const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

// Transparency utility
export function transparentize(color: string, alpha: number) {
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`;
  }
  return color;
}

// Random number utility
export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate array of numbers
export function numbers(config: { count: number; min: number; max: number }) {
  const { count, min, max } = config;
  return Array.from({ length: count }, () => rand(min, max));
}

// Generate months
export function months({ count }: { count: number }) {
  const monthNames = [
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
    "November",
    "December",
  ];
  const now = new Date();
  const months: string[] = [];
  for (let i = 0; i < count; i++) {
    const month = new Date(now);
    month.setMonth(now.getMonth() - (count - 1 - i));
    months.push(monthNames[month.getMonth()]);
  }
  return months;
}

// Generate a color based on index
export function namedColor(index: number) {
  const colors = Object.values(CHART_COLORS);
  return colors[index % colors.length];
}
