import { Page } from '@core/Page';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '@/redux/initialState';
import { storage, debounce, getStorageName } from '@core/utils';

export class ExcelPage extends Page {
  getRoot() {
    const storageName = getStorageName(this.params);
    const state = storage(storageName);

    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state) => {
      storage(storageName, state);
    }, 500);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
