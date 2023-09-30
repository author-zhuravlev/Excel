export const capitalize = (str) => {
  if (typeof str !== 'string') return '';

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getRange = (start, end) => {
  if (start > end) {
    [end, start] = [start, end];
  }

  return new Array(end - start + 1).fill('').map((_, i) => i + start);
};

export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
};

export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
};

export const camelToDashCase = (str) => 
  str.replace(/([A-Z])/g, (g) => '-' + g[0].toLowerCase());

export const toInlineStyles = (styles) => 
  Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
    .join('; ');

export const debounce = (fn, delay) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
