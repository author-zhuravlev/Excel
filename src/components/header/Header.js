import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/DOM';
import { defaultTitle } from '@/constants';
import { ActiveRoute } from '@core/routes/ActiveRoute';
import * as actions from '@/redux/actions';
import { getStorageName } from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($el, options) {
    super($el, {
      ...options,
      name: 'Header',
      listeners: ['input', 'click'],
    });
  }

  toHtml() {
    return `
      <input
        type="text"
        class="input"
        value="${this.store.getState().title || defaultTitle}"
      />

      <div>
        <div class="button" data-button="delete">
          <span class="material-icons" data-button="delete">delete</span>
        </div>

        <div class="button" data-button="exit">
          <span class="material-icons" data-button="exit">exit_to_app</span>
        </div>
      </div>
    `;
  }

  onClick(e) {
    const $target = $(e.target);

    if ($target.data.button === 'delete') {
      const decision = confirm('Вы действительно хотите удалить таблицу?');

      if (decision) {
        const storageName = getStorageName(ActiveRoute.param);
        localStorage.removeItem(storageName);
        ActiveRoute.navigate('');
      }
    }
    if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  onInput(e) {
    const $target = $(e.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }
}
