import readtingTime from "reading-time";

export const getReadingTime = (text: string) => {
  const result = readtingTime(text);
  
  return {
    ...result,
    minutes: Math.floor(result.minutes),
  };
};