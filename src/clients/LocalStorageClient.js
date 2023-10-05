import { storage } from '@core/utils';

export class LocalStorageClient {
  constructor(key) {
    this.key = key;
  }

  save(state) {
    storage(this.key, state);
    return Promise.resolve();
  }

  get() {
    return Promise.resolve(storage(this.key));
  }
}
