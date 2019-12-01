import memoize from "memoize-one";
import shortid from "shortid";

export const isEqual = (array1, array2) => {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
};

const compare = (field, direction) => (country1, country2) => {
  if (country1[field].toLowerCase() < country2[field].toLowerCase())
    return direction === "desc" ? -1 : 1;

  if (country1[field].toLowerCase() > country2[field].toLowerCase())
    return direction === "desc" ? 1 : -1;

  return 0;
};

export const applyFilter = memoize((countries, filter, field, direction) =>
  countries
    .filter(
      country =>
        country.name.toLowerCase().includes(filter.toLowerCase()) ||
        country.capital.toLowerCase().includes(filter.toLowerCase())
    )
    .sort(compare(field, direction))
);

export const setLocalStorage = countries => {
  localStorage.setItem("countries", JSON.stringify(countries));
  return countries;
};

export const getFromLocalStorage = item =>
  JSON.parse(localStorage.getItem(item));

export const initLocalStorage = initialState => {
  return localStorage.getItem("countries")
    ? { ...initialState, countries: getFromLocalStorage("countries") }
    : { ...initialState, countries: setLocalStorage(initialState.countries) };
};

export const generateRandomCountries = count => {
  const countries = [];
  for (let i = 0; i < count; i++) {
    countries.push({
      id: shortid.generate(),
      name: shortid.generate(),
      capital: shortid.generate()
    });
  }
  return countries;
};
