import { Page } from '@core/Page';
import { $ } from '@core/DOM';
import { getDashboardList } from '@/components/dashboard/dashboard.template';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'dashboard').html(`
    <div class="dashboard__header">
      <h1>Excel Dashboard</h1>
    </div>

    <div class="dashboard__new">
      <div class="dashboard__view">
        <a href="#excel/${Date.now()}" class="dashboard__create">
          Новая <br/> таблица
        </a>
      </div>
    </div>

    <div class="dashboard__table dashboard__view">
      ${getDashboardList()}
    </div>
    `);
  }
}
