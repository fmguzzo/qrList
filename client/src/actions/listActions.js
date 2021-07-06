import axios from "axios";
import * as actionTypes from "../constants/listConstants";

export const getListList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.LIST_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/lists/${userInfo.idSite}/site`,
      config
    );

    dispatch({
      type: actionTypes.LIST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionTypes.LIST_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteList = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.LIST_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/lists/${id}`, config);

    dispatch({ type: actionTypes.LIST_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionTypes.LIST_DELETE_FAIL,
      payload: message,
    });
  }
};

export const getListDetails = (listId) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.LIST_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/lists/${listId}`, config);

    dispatch({
      type: actionTypes.LIST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionTypes.LIST_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateListDetails =
  (listId, updatedList) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.LIST_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/lists/${listId}`,
        updatedList,
        config
      );

      dispatch({
        type: actionTypes.LIST_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: actionTypes.LIST_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const createListDetails =
  (createdList) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.LIST_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/lists/${userInfo.idSite}/site`,
        createdList,
        config
      );

      dispatch({
        type: actionTypes.LIST_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: actionTypes.LIST_CREATE_FAIL,
        payload: message,
      });
    }
  };
