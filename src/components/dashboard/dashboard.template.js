import { storage } from '@core/utils';

const toListItem = (key) => {
  const tableData = storage(key);
  const tableId = key.split(':')[1];

  return `
    <li class="dashboard__record">
      <a href="#excel/${tableId}">${tableData.title}</a>
      <strong>
        ${new Date(tableData.date).toLocaleDateString()}
        ${new Date(tableData.date).toLocaleTimeString()}
      </strong>
    </li>
  `;
};

const getExcelStorageKeys = () => {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.includes('excel')) {
      keys.push(key);
    }
  }

  return keys;
};

export const getDashboardList = () => {
  const keys = getExcelStorageKeys();

  if (!keys.length) return `<p>Вы пока не создали ни одной таблицы</p>`;

  return `
    <div class="dashboard__list-header">
      <span>Название таблицы</span>
      <span>Дата открытия</span>
    </div>

    <ul class="dashboard__list">
      ${keys.map(toListItem).join('')}
    </ul>
  `;
};
