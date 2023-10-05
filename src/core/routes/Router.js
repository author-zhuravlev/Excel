import { Loader } from '@/components/Loader';
import { $ } from '../DOM';
import { ActiveRoute } from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;

    this.loader = new Loader();
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  get activeRoute() {
    return ActiveRoute.param[0] || 'dashboard';
  }

  async changePageHandler() {
    if (this.page) this.page.destroy();
    this.$placeholder.clear().append(this.loader.getRoot());

    const Page = this.routes[this.activeRoute];
    this.page = new Page(ActiveRoute.param);

    const root = await this.page.getRoot();

    this.$placeholder.clear().append(root);

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
