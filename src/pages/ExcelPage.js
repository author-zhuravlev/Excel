import { Page } from '@core/Page';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '@/redux/initialState';
import { getStorageName } from '@core/utils';
import { StateProcessor } from '@core/StateProcessor';
import { LocalStorageClient } from '@/clients/LocalStorageClient';

export class ExcelPage extends Page {
  constructor(params) {
    super(params);

    this.storeSub = null;
    this.processor = new StateProcessor(
      new LocalStorageClient(getStorageName(this.params))
    );
  }

  async getRoot() {
    const state = await this.processor.get();

    const store = createStore(rootReducer, normalizeInitialState(state));

    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unsubscribe();
  }
}
