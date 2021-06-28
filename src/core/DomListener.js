import {capitalize} from '@core/utils';

export class DomListener {
  constructor($el, listeners = []) {
    if (!$el) {
      throw new Error(`No $el provided for DomListener`);
    }
    this.$el = $el;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);

      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name} component`);
      }

      Object.getPrototypeOf(this)[method] = this[method].bind(this);// "биндим" и переприсваиваем метод
      
      this.$el.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      this.$el.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
