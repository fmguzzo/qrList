import axios from "axios";
import * as actionTypes from "../constants/cotegoryConstants";

export const getCategoriesList = (listId) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.CATEGORY_FETCH_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/categories/list/${listId}`, config);

    dispatch({ type: actionTypes.CATEGORY_FETCH_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionTypes.CATEGORY_FETCH_FAIL,
      payload: message,
    });
  }
};

export const categoryFetchReset = () => ({
  type: actionTypes.CATEGORY_FETCH_RESET,
});

export const deleteCategoryId = (categoryId) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.CATEGORY_DELETE_REQUEST,
  });
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/categories/${categoryId}`, config);
    dispatch({
      type: actionTypes.CATEGORY_DELETE_SUCCESS,
    });
    dispatch(categoryFetchReset());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionTypes.CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createCategory =
  ({ listId, name, desc }) =>
  async (dispatch, getState) => {
    dispatch({ type: actionTypes.CATEGORY_CREATE_REQUEST });
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `/api/categories/list/${listId}`,
        { name, desc },
        config
      );
      dispatch({ type: actionTypes.CATEGORY_CREATE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: actionTypes.CATEGORY_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateCategory =
  ({ categoryId, name, desc }) =>
  async (dispatch, getState) => {
    dispatch({ type: actionTypes.CATEGORY_UPDATE_REQUEST });

    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/categories/${categoryId}`, { name, desc }, config);
      dispatch({ type: actionTypes.CATEGORY_UPDATE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: actionTypes.CATEGORY_UPDATE_FAIL,
        payload: message,
      });
    }
  };
