export const getLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData) return JSON.parse(serializedData);
  } catch (error) {
    console.warn(error);
  }

  return defaultValue;
};

export const setLocalStorage = <T,>(key: string, value: T) => {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.warn(error);
  }
};
