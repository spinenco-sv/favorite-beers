export const range = (start, end) => Array.from({ length: (end - start) }, (v, k) => k + start);

export const generateYears = (start) => {
  const end = new Date().getFullYear();

  return range(start, end).sort((a, b) => b - a);
};

export const generateMonths = () => {
  return range(1, 12);
};
