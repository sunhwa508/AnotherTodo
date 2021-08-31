const options: Record<string, string> = {
  month: 'long',
  day: 'numeric',
  weekday: 'short',
  timeZone: 'UTC',
};
export const dateToString = (date: Date | string): string =>
  typeof date === 'string' ? new Date(date).toLocaleString('ko-KR', options) : date.toLocaleString('ko-KR', options);
