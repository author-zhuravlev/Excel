export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) return false;

    this.listeners[event].forEach(listener => {
      listener(...args);
    });

    return true;
  }

  subscribe(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];

    this.listeners[event].push(fn);

    return () => { // возвращаем fn, чтобы отписаться
      this.listeners[event] = this.listeners[event]
          .filter(listener => listener !== fn);
    };
  }
}
