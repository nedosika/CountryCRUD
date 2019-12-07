export const throttle = (callback, delay) => {
  var timeoutHandler = null;
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        callback();
        clearInterval(timeoutHandler);
        timeoutHandler = null;
      }, delay);
    }
  };
};
