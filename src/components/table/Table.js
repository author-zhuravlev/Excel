import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/DOM';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, matrix, nextSelector} from '@/components/table/table.helpers';
import {TableSelection} from '@/components/table/TableSelection';

const keys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Enter', 'Tab'];

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($el, options) {
    super($el, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$el.find('[data-id="0:0"]'));// выделение первой ячейки
    
    // подписываемся на события
    this.$on('Formula:input', text => {
      this.selection.current.text(text);
    });
    this.$on('Formula:done', () => {
      this.selection.current.focus();
    });
  }

  toHtml() {
    return createTable(20);
  }

  selectCell($cell) {
    this.selection.selected($cell);
    this.$emit('Table:select', $cell.text());
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e, this.$el);
    } else if (isCell(e)) {
      const $target = $(e.target);

      if (e.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$el.find(`[data-id="${id}"]`));
        this.selection.selectedGroup($cells);
      } else {      
        this.selection.selected($target);
        this.$emit('Table:mousedown', $target.text());
      }
    }
  }

  onKeydown(e) {
    const {key} = e;

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$el.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(e) {
    this.$emit('Table:input', $(e.target).text());
  }
}
