/** Returns true when the array is in ascending order */
export function isAscending(arr: (string | number)[]): boolean {
  return arr.every((val, i) => i === 0 || val >= arr[i - 1]);
}

/** Returns true when the array is in descending order */
export function isDescending(arr: (string | number)[]): boolean {
  return arr.every((val, i) => i === 0 || val <= arr[i - 1]);
}

/** Sort (ascending) */
export function sortedAsc(arr: string[]): string[] {
  return [...arr].sort((a, b) => a.localeCompare(b));
}

/** Sort (descending) */
export function sortedDesc(arr: string[]): string[] {
  return [...arr].sort((a, b) => b.localeCompare(a));
}
