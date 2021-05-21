export const saveLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocal = (key) => {
  const histories = JSON.parse(localStorage.getItem(key));
  return histories;
};
