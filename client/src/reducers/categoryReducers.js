/**
 * CATEGORY - REDUCER PARA TODAS LAS ACCIONES DEL CRUD
 *          - STATUS - ENUM
 */

import * as actionTypes from "../constants/cotegoryConstants";

const initialState = {
  categories: [],
  fetchStatus: "idle",
  deleteStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  error: null,
};

export const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CATEGORY_FETCH_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case actionTypes.CATEGORY_FETCH_SUCCESS:
      return { ...state, fetchStatus: "succeeded", categories: payload };
    case actionTypes.CATEGORY_FETCH_FAIL:
      return { ...state, fetchStatus: "failed", error: payload };
    case actionTypes.CATEGORY_FETCH_RESET:
      return { ...state, ...initialState };
    case actionTypes.CATEGORY_DELETE_REQUEST:
      return { ...state, deleteStatus: "loading" };
    case actionTypes.CATEGORY_DELETE_SUCCESS:
      return { ...state, deleteStatus: "succeeded" };
    case actionTypes.CATEGORY_DELETE_FAIL:
      return { ...state, deleteStatus: "failed", error: payload };
    case actionTypes.CATEGORY_CREATE_REQUEST:
      return { ...state, createStatus: "loading" };
    case actionTypes.CATEGORY_CREATE_SUCCESS:
      return { ...state, createStatus: "succeeded" };
    case actionTypes.CATEGORY_CREATE_FAIL:
      return { ...state, createStatus: "failed", error: payload };
    case actionTypes.CATEGORY_UPDATE_REQUEST:
      return { ...state, updateStatus: "loading" };
    case actionTypes.CATEGORY_UPDATE_SUCCESS:
      return { ...state, updateStatus: "succeeded" };
    case actionTypes.CATEGORY_UPDATE_FAIL:
      return { ...state, updateStatus: "failed", error: payload };
    default:
      return state;
  }
};
