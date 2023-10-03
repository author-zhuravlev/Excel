import {
  CHANGE_TEXT,
  TABLE_RESIZE,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE,
} from './types';

export const tableResize = (payload) => ({
  type: TABLE_RESIZE,
  payload,
});

export const changeText = (payload) => ({
  type: CHANGE_TEXT,
  payload,
});

export const changeStyles = (payload) => ({
  type: CHANGE_STYLES,
  payload,
});

export const applyStyle = (payload) => ({
  type: APPLY_STYLE,
  payload,
});

export const changeTitle = (payload) => ({
  type: CHANGE_TITLE,
  payload,
});

export const updateDate = () => ({
  type: UPDATE_DATE,
});

