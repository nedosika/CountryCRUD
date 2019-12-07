import memoize from "memoize-one";

import { compare } from "./UtilsCompare";

export const sort = memoize((countries, field, direction) =>
  [...countries].sort(compare(field, direction))
);
