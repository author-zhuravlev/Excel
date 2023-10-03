import { $ } from '@/core/DOM';
import { Emitter } from '@/core/Emitter';
import { StoreSubscriber } from '@/core/StoreSubscriber';
import { updateDate } from '@/redux/actions';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentsOption = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentsOption);
      $el.html(component.toHtml());
      $root.append($el);

      return component;
    });

    return $root;
  }

  init() {
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeComponents();
    this.components.forEach((component) => component.destroy());
  }
}
