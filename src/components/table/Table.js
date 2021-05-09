import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.helpers';
export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($el) {
    super($el, {
      listeners: ['mousedown'],
    });
  }

  toHtml() {
    return createTable(20);
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e, this.$el);
    }
  }
}
