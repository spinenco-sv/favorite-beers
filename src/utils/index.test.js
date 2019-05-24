import {
  generateMonths,
  generateYears,
  filterBeers,
  range,
  stringToDate,
  truncateText
} from './index';

describe('Test utils functions', () => {
  it('Should generate an array with months', () => {
    expect(generateMonths()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('Should generate an array with years until current year', () => {
    const currentYear = new Date().getFullYear();
    expect(generateYears(currentYear-3)).toEqual([currentYear, currentYear-1, currentYear-2, currentYear-3]);
  });

  it('Should generate an array from range', () => {
    expect(range(1,5)).toEqual([1, 2, 3, 4, 5]);
    expect(range(4,5)).not.toBe([3, 4, 5]);
  });

  it('Should convert string to date', () => {
    expect(stringToDate('4/2018').getTime()).toEqual(new Date(2018, 4).getTime());
    expect(stringToDate('04/2018').getTime()).toEqual(new Date(2018, 4).getTime());
  });

  it('Should truncate text', () => {
    expect(truncateText('Test text for truncate', 2)).toEqual('Test text...');
    expect(truncateText('Test text for truncate', 10)).toEqual('Test text for truncate');
  });


  it('Should filter beers based on interval', () => {
    const beers = [
      {
        "id": 3,
        "name": "Berliner Weisse With Yuzu - B-Sides",
        "tagline": "Japanese Citrus Berliner Weisse.",
        "first_brewed": "11/2015"
      },
      {
        "id": 4,
        "name": "Pilsen Lager",
        "tagline": "Unleash the Yeast Series.",
        "first_brewed": "09/2013"
      },
      {
        "id": 5,
        "name": "Avery Brown Dredge",
        "tagline": "Bloggers' Imperial Pilsner.",
        "first_brewed": "02/2011"
      }
    ];

    expect(filterBeers(beers, '01/2015', '02/2016').length).toEqual(1);
    expect(filterBeers(beers, '01/2013', '02/2016').length).toEqual(2);
    expect(filterBeers(beers, '01/2010', '02/2016').length).toEqual(3);
    expect(filterBeers(beers, '01/2016', '02/2010').length).toEqual(3);

    expect(filterBeers(beers, '01/2016', '02/2020').length).toEqual(0);
  });
});