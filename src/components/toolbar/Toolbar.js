import { $ } from '@core/DOM';
import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { defaultCellStyles } from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($el, options) {
    super($el, {
      ...options,
      name: 'Toolbar',
      listeners: ['click'],
      subscriptions: ['currentStyles'],
    });
  }

  prepare() {
    this.initState(defaultCellStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHtml() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(e) {
    const $target = $(e.target);
    
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);

      // this.setState(value);
      this.$emit('Toolbar:applyStyle', value);
    }
  }
}
