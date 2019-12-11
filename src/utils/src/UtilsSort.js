import memoize from "memoize-one";

import { compare } from "./UtilsCompare";

export const sort = memoize((countries, field, direction) => {
  return direction === "desc"
    ? [...countries].sort(compare(field))
    : [...countries].sort(compare(field)).reverse();
});
