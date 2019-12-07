export const debounce = (callback, delay) => {
  var timeoutHandler = null;
  return () => {
    clearTimeout(timeoutHandler);
    timeoutHandler = setTimeout(callback, delay);
  };
};
