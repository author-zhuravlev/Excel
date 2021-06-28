import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($el, options = {}) {
    super($el, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribe = [];

    this.prepare();
  }
  
  // настраиваем компнент(вызываем перед init)
  prepare() {}

  // возвращает шаблон компонента
  toHtml() {
    return '';
  }

  // уведомляем слушатели про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribe.push(unsub);
  }

  // инициализируем компонент
  // добавляем DOM слушатели
  init() {
    this.initDOMListeners();
  }

  // удаляем компонент
  // удаляем DOM слушатели
  destroy() {
    this.removeDOMListeners();
    this.unsubscribe.forEach(unsub => unsub());
  }
}
