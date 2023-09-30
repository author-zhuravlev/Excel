import { $ } from '@core/DOM';
import { parse } from '@core/parse';
import { ExcelComponent } from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, matrix, nextSelector } from './table.helpers';
import { TableSelection } from './TableSelection';
import { defaultCellStyles } from '@/constants';

const keys = [
  'ArrowUp',
  'ArrowDown',
  'ArrowRight',
  'ArrowLeft',
  'Enter',
  'Tab',
];

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($el, options) {
    super($el, {
      ...options,
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    // выделение первой ячейки
    this.selectCell(this.$el.find('[data-id="0:0"]'));

    // подписываемся на события
    this.$on('Formula:input', (text) => {
      this.selection.current
        .attr('data-value', text)
        .text(parse(text));
      this.updateTextInStore(text);
    });
    this.$on('Formula:done', () => {
      this.selection.current.focus();
    });
    this.$on('Toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style);
      this.$dispatch(actions.applyStyle({
        style,
        ids: this.selection.ids,
      }));
    });
  }

  toHtml() {
    return createTable(this.store.getState());
  }

  selectCell($cell) {
    this.selection.selected($cell);
    this.$emit('Table:select', $cell);

    const styles = $cell.getStyles(Object.keys(defaultCellStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  updateTextInStore(text) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        text,
      })
    );
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(e, this.$el);
      this.$dispatch(actions.tableResize(data));
    } catch (err) {
      console.error('Resize error', err.message);
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e);
    } else if (isCell(e)) {
      const $target = $(e.target);

      if (e.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$el.find(`[data-id="${id}"]`)
        );

        this.selection.selectedGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(e) {
    const { key } = e;

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$el.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(e) {
    this.updateTextInStore($(e.target).text());
  }
}
