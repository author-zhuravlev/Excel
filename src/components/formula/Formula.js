import { $ } from '@core/DOM';
import { ExcelComponent } from '@core/ExcelComponent';

const keys = ['Enter', 'Tab'];

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($el, options) {
    super($el, {
      ...options,
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscriptions: ['currentText'],
    });
  }

  init() {
    super.init();
    this.$formula = this.$el.find('#formula');

    // подписываемся на события
    this.$on('Table:select', ($cell) => {
      this.$formula.text($cell.data.value);
    });
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText);
  }

  toHtml() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(e) {
    this.$emit('Formula:input', $(e.target).text());
  }

  onKeydown(e) {
    if (keys.includes(e.key)) {
      e.preventDefault();

      this.$emit('Formula:done');
    }
  }
}
