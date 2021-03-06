export const stringToDate = (string)=> {
  const [ month, year] = string.split(/[\\\/]/);
  return new Date(year, month, 1);
};

export const filterBeers = (beers, from, to) => {
  return beers.filter(
    (beer) => {
      const fromDate = stringToDate(from);
      const toDate = stringToDate(to);
      const currentDate = stringToDate(beer.first_brewed);

      return fromDate < toDate ?
        (fromDate <= currentDate && toDate >= currentDate) :
        (fromDate >= currentDate && toDate <= currentDate);
    }
  )
};

export const truncateText = (str, limit, delimiter = '...') => {
  const text = str.split(' ').splice(0, limit).join(' ');

  return text !== str ? `${text}${delimiter}` : text;
};

export const range = (start, end) => Array.from({ length: (end - start + 1) }, (v, k) => k + start);

export const generateYears = (start) => {
  const end = new Date().getFullYear();

  return range(start, end).sort((a, b) => b - a);
};

export const generateMonths = () => {
  return range(1, 12);
};
