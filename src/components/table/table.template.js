const CODES = {
  A: 65,
  Z: 90,
};

const createRow = (index, content) => {
  const resize = index 
    ? '<div class="row-resize" data-resize="row"></div>' 
    : '';

  return `
    <div class="row" data-type="resizable" data-row=${index}>
      <div class="row-info">
        ${index ?? ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
};

const toColumn = (index) => `
    <div class="column" data-type="resizable" data-col=${index}>
      ${toChar(index)}
      <div class="col-resize" data-resize="col"></div>
    </div>
`;

const toCell = (col) => `<div class="cell" data-col="${col}" contenteditable></div>`;

const toChar = (index) => String.fromCharCode(CODES.A + index);

const cycle = (count, callback) => {
  let cells = '';

  for (let i = 0; i <= count; i++) {
    cells += callback(i);
  }

  return cells;
};

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A;
  const rows = [];

  const cols = cycle(colsCount, toColumn);

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = cycle(colsCount, toCell);

    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
};
