import {getRange} from '@core/utils';

export const shouldResize = (e) => e.target.dataset.resize;

export const isCell = (e) => e.target.dataset.type === 'cell';

export const matrix = ($target, $current) => {
  const target = $target.id(true);
  const current = $current.id(true);

  const rows = getRange(current.row, target.row);
  const cols = getRange(current.col, target.col);

  return rows.reduce((acc, row) => {
    cols.forEach(col => acc.push(`${row}:${col}`));
    return acc;
  }, []);
};

export const nextSelector = (key, {row, col}) => {
  const MIN_VALUE = 0;
  
  switch (key) {
    case 'ArrowDown':
    case 'Enter':
      row++;
      break;
    case 'ArrowRight':
    case 'Tab':
      col++;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? 0 : row - 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? 0 : col - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
};
