import { storage } from '@core/utils';
import { defaultCellStyles, defaultTitle } from '@/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultCellStyles,
};

export const initialState = storage('excel-state') || defaultState;
