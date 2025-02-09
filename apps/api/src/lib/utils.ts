export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const clone = { ...obj };
  keys.forEach((key) => delete clone[key]);
  return clone;
};

export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  const clone = {} as Pick<T, K>;
  keys.forEach((key) => {
    clone[key] = obj[key];
  });
  return clone;
};
