import {$} from '@core/DOM';
import {ExcelComponent} from '@core/ExcelComponent';

const keys = ['Enter', 'Tab'];

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($el, options) {
    super($el, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {//
    super.init();
    this.$formula = this.$el.find('#formula');

    const addTextToFormula = (text) => {
      this.$formula.text(text);
    };

    // подписываемся на события
    this.$on('Table:select', addTextToFormula);
    this.$on('Table:input', addTextToFormula);
    this.$on('Table:mousedown', addTextToFormula);
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
