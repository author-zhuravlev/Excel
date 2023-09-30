import {
  CHANGE_TEXT,
  TABLE_RESIZE,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
} from './types';

export const rootReducer = (state, action) => {
  switch (action.type) {
  case TABLE_RESIZE: {
    const { type, id, value } = action.payload;
    const field = type === 'col' ? 'colState' : 'rowState';

    return {
      ...state,
      [field]: { ...state[field], [id]: value },
    };
  }
  case CHANGE_TEXT:
    return {
      ...state,
      dataState: {
        ...state.dataState,
        [action.payload.id]: action.payload.text,
      },
      currentText: action.payload.text,
    };
  case CHANGE_STYLES:
    return {
      ...state,
      currentStyles: {
        ...state.currentStyles,
        ...action.payload,
      },
    };
  case APPLY_STYLE: {
    const stylesState = action.payload.ids.reduce((result, id) => {
      result[id] = {...state.stylesState[id], ...action.payload.style};
      return result;
    }, {});

    return {
      ...state,
      stylesState: {
        ...state.stylesState,
        ...stylesState,
      },
      currentStyles: {
        ...state.currentStyles,
        ...action.payload.style,
      },
    };
  }
  case CHANGE_TITLE:
    return {...state, title: action.payload};
  default:
    return state;
  }
};
