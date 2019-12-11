export const compare = field => (country1, country2) =>
  country1[field] < country2[field] ? -1 : 1;
