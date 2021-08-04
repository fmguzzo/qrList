/**
 * LIST - 1 REDUCER POR CADA ACCION DE CRUD
 *      - LOADING = BOOLEAN
 */

import * as actionTypes from "../constants/listConstants";

export const listListReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case actionTypes.LIST_LIST_REQUEST:
      return { ...state, loading: true };
    case actionTypes.LIST_LIST_SUCCESS:
      return { loading: false, lists: action.payload };
    case actionTypes.LIST_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LIST_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.LIST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.LIST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.LIST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const listDetailsReducer = (state = { list: {} }, action) => {
  switch (action.type) {
    case actionTypes.LIST_DETAILS_REQUEST:
      return { ...state, loading: true };

    case actionTypes.LIST_DETAILS_SUCCESS:
      return { loading: false, list: action.payload };

    case actionTypes.LIST_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const listUpdateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.LIST_UPDATE_REQUEST:
      return { ...state, loading: true };

    case actionTypes.LIST_UPDATE_SUCCESS:
      return { loading: false, success: true, list: payload };

    case actionTypes.LIST_UPDATE_FAIL:
      return { loading: false, success: false, error: payload };

    case actionTypes.LIST_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const listCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.LIST_CREATE_REQUEST:
      return { ...state, loading: true };

    case actionTypes.LIST_CREATE_SUCCESS:
      return { loading: false, success: true, list: payload };

    case actionTypes.LIST_CREATE_FAIL:
      return { loading: false, success: false, error: payload };

    case actionTypes.LIST_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
