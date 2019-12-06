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

let timeout;

export const throttle = (f, t) => (args) =>{
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if ( !timeout ) {
    timeout = setTimeout(() => {
      timeout = null;
      f(args);
     // The actualResizeHandler will execute at a rate of 15fps
     }, t);
  }
}

export const debounce = (f, t) =>{
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && ((this.lastCall - previousCall) <= t)) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(args), t);
  }
}

// throttle(f, t) {
//   return function (args) {
//     let previousCall = this.lastCall;
//     this.lastCall = Date.now();
//     if (previousCall === undefined // function is being called for the first time
//         || (this.lastCall - previousCall) > t) { // throttle time has elapsed
//       f(args);
//     }
//   }
// }
