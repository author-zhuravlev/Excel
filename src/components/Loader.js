import { $ } from '@/core/DOM';

export class Loader {
  getRoot() {
    return $.create('div', 'loader').html(`
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
  `);
  }
}
