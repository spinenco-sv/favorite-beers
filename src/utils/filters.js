export const stringToDate = (string)=> {
  const [month, year, day = '01'] = string.split(/[\\\/]/);

  return new Date(year, month, day);
};

export const filterBeers = (beers, from, to) => {
  return beers.filter(
    (beer) => stringToDate(from) <= stringToDate(beer.first_brewed)
    && stringToDate(to) >= stringToDate(beer.first_brewed)
  )
};
export const truncateText = (str, limit) =>
  str.split(' ').splice(0, limit).join(' ');