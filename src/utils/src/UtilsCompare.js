export const compare = (field, direction) => (country1, country2) => {
  if (country1[field] < country2[field]) return direction === "desc" ? -1 : 1;

  if (country1[field] > country2[field]) return direction === "desc" ? 1 : -1;

  return 0;
};
