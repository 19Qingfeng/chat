export const debounce = (fn, delay) => {
  let timer;
  return function() {
    if (timer) clearTimeout(timer);
    const context = this;
    const args = arguments;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay * 1000);
  };
};