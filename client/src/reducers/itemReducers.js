import * as actionTypes from "../constants/itemConstants";

const INITIAL_KEY_STATE = {
  result: null,
  current: null,
  isLoading: false,
  isSuccess: false,
};

const INITIAL_STATE = {
  current: {
    result: null,
  },
  list: {
    result: {
      items: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1,
      },
    },
    isLoading: false,
    isSuccess: false,
  },
  create: INITIAL_KEY_STATE,
  update: INITIAL_KEY_STATE,
  delete: INITIAL_KEY_STATE,
  read: INITIAL_KEY_STATE,
  search: { ...INITIAL_KEY_STATE, result: [] },
};

const itemReducer = (state = INITIAL_STATE, action) => {
  const { payload, keyState } = action;
  switch (action.type) {
    case actionTypes.ITEM_RESET_STATE:
      return INITIAL_STATE;
    case actionTypes.ITEM_CURRENT_ITEM:
      return {
        ...state,
        current: {
          result: payload,
        },
      };
    case actionTypes.ITEM_REQUEST_LOADING:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          isLoading: true,
        },
      };
    case actionTypes.ITEM_REQUEST_FAILED:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          isLoading: false,
          isSuccess: false,
        },
      };
    case actionTypes.ITEM_REQUEST_SUCCESS:
      return {
        ...state,
        [keyState]: {
          ...state[keyState],
          result: payload,
          isLoading: false,
          isSuccess: true,
        },
      };
    case actionTypes.ITEM_CURRENT_ACTION:
      return {
        ...state,
        [keyState]: {
          ...INITIAL_KEY_STATE,
          current: payload,
        },
      };
    case actionTypes.ITEM_RESET_ACTION:
      return {
        ...state,
        [keyState]: {
          ...INITIAL_STATE[keyState],
        },
      };
    default:
      return state;
  }
};

export default itemReducer;
