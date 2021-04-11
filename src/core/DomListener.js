import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    // console.log(this); 
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.constructor.name} component`);
      }

      this[method] = this[method].bind(this); // "биндим" и переприсваиваем метод

      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
