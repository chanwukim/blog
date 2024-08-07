import readtingTime from "reading-time";

export function getReadingTimeInMinutes(text: string) {
  const result = readtingTime(text);
  return {
    ...result,
    minutes: Math.floor(result.minutes),
  };
}
