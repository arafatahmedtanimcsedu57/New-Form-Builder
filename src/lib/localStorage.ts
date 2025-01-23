export const saveToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  const currentLocalStorage = window.localStorage.getItem(key) as string;

  if (currentLocalStorage) {
    return JSON.parse(currentLocalStorage);
  }

  return null;
};

export const removeFromLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
  return;
};
