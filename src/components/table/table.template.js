const CODES = {
  A: 65,
  Z: 90,
};

const createRow = (index, content) => {
  const resize = index 
    ? '<div class="row-resize" data-resize="row"></div>' 
    : '';
  const rowIndex = index ?? '';

  return `
    <div class="row" data-type="resizable" data-row="${rowIndex}">
      <div class="row-info">
        ${rowIndex}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
};

const toColumn = (_, index) => `
  <div class="column" data-type="resizable" data-col="${index}">
    ${toChar(index)}
    <div class="col-resize" data-resize="col"></div>
  </div>
`;

const toCell = (row, col) => `
  <div
    class="cell"
    data-col="${col}"
    data-type="cell"
    data-id="${row}:${col}"
    contenteditable
    spellcheck></div>
`;

const toChar = (index) => String.fromCharCode(CODES.A + index);

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1; // 26 letters 
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill(row)
        .map(toCell)
        .join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
};
