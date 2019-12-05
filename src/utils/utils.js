import memoize from "memoize-one";

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
