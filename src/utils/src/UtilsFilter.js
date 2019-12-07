import memoize from "memoize-one";

export const filter = memoize((countries, filter) =>
  countries.filter(
    country =>
      country.name.toLowerCase().includes(filter.toLowerCase()) ||
      country.capital.toLowerCase().includes(filter.toLowerCase())
  )
);
