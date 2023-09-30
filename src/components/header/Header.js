import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/DOM';
import { defaultTitle } from '@/constants';
import * as actions from '@/redux/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($el, options) {
    super($el, {
      ...options,
      name: 'Header',
      listeners: ['input'],
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
        <div class="button">
          <span class="material-icons">exit_to_app</span>
        </div>

        <div class="button">
          <span class="material-icons">delete</span>
        </div>
      </div>
    `;
  }

  onInput(e) {
    const $target = $(e.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }
}
