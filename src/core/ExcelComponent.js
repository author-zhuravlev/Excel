import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($el, options = {}) {
    super($el, options.listeners);
    this.name = options.name || '';
    this.store = options.store;
    this.emitter = options.emitter;
    this.subscriptions = options.subscriptions || [];
    this.unsubscribe = [];

    this.prepare();
  }

  // настраиваем компонент(вызываем перед init)
  prepare() {}

  // возвращает шаблон компонента
  toHtml() {
    return '';
  }

  isWatching(key) {
    return this.subscriptions.includes(key);
  }

  storeChanged() {}

  $dispatch(action) {
    this.store.dispatch(action);
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
    this.unsubscribe.forEach((unsub) => unsub());
  }
}
