export class ActiveRoute {
  static get hash() {
    return window.location.hash.slice(1);
  }

  static get param() {
    return this.hash.split('/');
  }

  static navigate(hash) {
    window.location.hash = hash;
  }
}
