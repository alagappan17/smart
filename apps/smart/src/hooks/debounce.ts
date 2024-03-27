const debounce = (fn: any, interval: number) => {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, interval);
  };
};

export default debounce;
