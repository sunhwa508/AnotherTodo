const options: Record<string, string> = {
  month: 'long',
  day: 'numeric',
  weekday: 'short',
  timeZone: 'UTC',
};

/**
 *  date형을 화면에 맞는 형식에 맞춰 string 으로 변환해주는 함수
 */
export const dateToString = (date: Date | string): string =>
  typeof date === 'string'
    ? new Date(date).toLocaleString('ko-KR', options)
    : date.toLocaleString('ko-KR', options);
