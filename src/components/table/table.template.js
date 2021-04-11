const CODES = {
  A: 65,
  Z: 90,
};

function createCells(colsCount) {
  let cells = '';

  for (let i = 0; i <= colsCount; i++) {
    cells += `<div class="cell" contenteditable></div>`;
  }

  return cells;
}

function createRow(index, content) {
  return `
    <div class="row">
      <div class="row-info">${index ?? ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

// function toColumn(col) {
//   return `
//     <div class="column">${col}</div>
//   `;
// }

// function toChar(_, index) {
//   return String.fromCharCode(CODES.A + index);
// }

function toChar(index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  // const colsCount = CODES.Z - CODES.A + 1;
  const colsCount = CODES.Z - CODES.A;
  const rows = [];
  let cols = '';

  // const cols = new Array(colsCount)
  //     .fill('')
  //     .map(toChar)
  //     .map(toColumn)
  //     .join('');

  for (let i = 0; i <= colsCount; i++) {
    cols += `<div class="column">${toChar(i)}</div>`;
  }

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = createCells(colsCount);

    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
