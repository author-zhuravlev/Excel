import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($el, options = {}) {
    super($el, options.listeners);
  }

  toHtml() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
