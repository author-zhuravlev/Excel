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
  date: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentText: '',
  currentStyles: defaultCellStyles,
});

export const initialState = storage('excel-state') || defaultState;

export const normalizeInitialState = (state) =>
  state 
    ? normalize(state) 
    : defaultState;
