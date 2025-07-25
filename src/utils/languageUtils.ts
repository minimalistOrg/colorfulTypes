export const pluralize = (count: number, noun: string) =>
  count === 1 ? noun : `${noun}s`
