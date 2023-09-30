import { defaultCellStyles } from '@/constants';
import { toInlineStyles } from '@core/utils';
import { parse } from '@core/parse';

const CODES = { A: 65, Z: 90 };
export const COLS_COUNT = CODES.Z - CODES.A + 1; // 26 letters
export const ROWS_COUNT = 30;
export const defaultCellWidth = 120;
export const defaultRowHeight = 24;


const toChar = (index) => String.fromCharCode(CODES.A + index);

const getData = (state, id) => state[id] || '';
const getWidth = (state, index) => (state[index] || defaultCellWidth) + 'px;';
const getHeight = (state, index) => (state[index] || defaultRowHeight) + 'px;';

const createRow = (index, content, rowState) => {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  const rowIndex = index ?? '';

  return `
    <div
      class="row"
      style="height: ${getHeight(rowState, rowIndex)}"
      data-type="resizable"
      data-row="${rowIndex}"
    >
      <div class="row-info">
        ${rowIndex}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
};

const toColumn = (colState) => (_, index) =>
  `
  <div
    class="column"
    style="width: ${getWidth(colState, index)}"
    data-type="resizable"
    data-col="${index}"
  >
    ${toChar(index)}
    <div class="col-resize" data-resize="col"></div>
  </div>
`;

const toCell = (state) => (row, col) => {
  const id = `${row}:${col}`;
  const styles = toInlineStyles({
    ...defaultCellStyles,
    ...state.stylesState[id],
  });
  const data = getData(state.dataState, id);

  return `
    <div
      class="cell"
      style="width: ${getWidth(state.colState, col)} ${styles};"
      data-col="${col}"
      data-type="cell"
      data-id="${id}"
      data-value="${data}"
      contenteditable
      spellcheck
    >
      ${parse(data)}
    </div>
  `;
};

export const createTable = (state = {}) => {
  const rows = [];

  const cols = new Array(COLS_COUNT)
    .fill('')
    .map(toColumn(state.colState))
    .join('');

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < ROWS_COUNT; row++) {
    const cells = new Array(COLS_COUNT)
      .fill(row)
      .map(toCell(state))
      .join('');

    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
};
