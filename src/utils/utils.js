import memoize from "memoize-one";
import shortid from "shortid";

export const isEqual = (array1, array2) => {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
};

const compare = (field, direction) => (country1, country2) => {
  if (country1[field] < country2[field])
    return direction === "desc" ? -1 : 1;

  if (country1[field] > country2[field])
    return direction === "desc" ? 1 : -1;

  return 0;
};

export const filtrate = memoize((countries, filter) =>
  countries.filter(
    country =>
      country.name.toLowerCase().includes(filter.toLowerCase()) ||
      country.capital.toLowerCase().includes(filter.toLowerCase())
  )
);

export const sort = memoize((countries, field, direction) =>
  [...countries].sort(compare(field, direction))
);

export const setLocalStorage = countries => {
  localStorage.setItem("countries", JSON.stringify(countries));
  return countries;
};

export const getFromLocalStorage = item =>
  JSON.parse(localStorage.getItem(item));

export const initLocalStorage = initialState =>
  localStorage.getItem("countries")
    ? { ...initialState, countries: getFromLocalStorage("countries") }
    : { ...initialState, countries: setLocalStorage(initialState.countries) };

export const generateRandomCountries = count => {
  const countries = [];
  for (let i = 0; i < count; i++) {
    countries.push({
      id: i + 1,
      name: shortid.generate(),
      capital: shortid.generate()
    });
  }
  return countries;
};
