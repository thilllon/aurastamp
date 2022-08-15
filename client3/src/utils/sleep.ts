export const sleep = (time: number): Promise<void> => new Promise((res) => setTimeout(res, time));
