import * as actionTypes from "../constants/itemConstants";
import itemRequest from "../requests/itemRequest";

export const itemCrud = {
  resetState: () => async (dispatch) => {
    dispatch({
      type: actionTypes.ITEM_RESET_STATE,
    });
  },

  resetAction: (keyState) => async (dispatch) => {
    dispatch({
      type: actionTypes.ITEM_RESET_ACTION,
      keyState,
      payload: null,
    });
  },

  currentAction: (keyState, data) => async (dispatch) => {
    dispatch({
      type: actionTypes.ITEM_CURRENT_ACTION,
      keyState: keyState,
      payload: { ...data },
    });
  },

  currentItem: (data) => async (dispatch) => {
    dispatch({
      type: actionTypes.ITEM_CURRENT_ITEM,
      payload: { ...data },
    });
  },

  list: (categoryId, currentPage, limitPage) => async (dispatch) => {
    dispatch({
      type: actionTypes.ITEM_REQUEST_LOADING,
      keyState: "list",
      payload: null,
    });

    let data = await itemRequest.list(categoryId, { currentPage, limitPage });

    if (data.success === true) {
      const result = {
        items: data.result,
        pagination: {
          current: parseInt(data.pagination.page, 10),
          pageSize: parseInt(data.pagination.pages, 10),
          total: parseInt(data.pagination.count, 10),
        },
      };
      dispatch({
        type: actionTypes.ITEM_REQUEST_SUCCESS,
        keyState: "list",
        payload: result,
      });
    } else {
      dispatch({
        type: actionTypes.ITEM_REQUEST_FAILED,
        keyState: "list",
        payload: null,
      });
    }
  },

  create:
    ({ categoryId, name, desc, image, price }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.ITEM_REQUEST_LOADING,
        keyState: "create",
        payload: null,
      });

      const jsonData = {
        name,
        desc,
        image,
        price,
      };

      let data = await itemRequest.create(categoryId, jsonData);

      if (data.success === true) {
        dispatch({
          type: actionTypes.ITEM_REQUEST_SUCCESS,
          keyState: "create",
          payload: data.result,
        });

        dispatch({
          type: actionTypes.ITEM_CURRENT_ITEM,
          payload: data.result,
        });
      } else {
        dispatch({
          type: actionTypes.ITEM_REQUEST_FAILED,
          keyState: "create",
          payload: null,
        });
      }
    },

  delete: (categoryId, itemId) => async (dispatch) => {
    dispatch({
      type: actionTypes.ITEM_REQUEST_LOADING,
      keyState: "delete",
      payload: null,
    });

    let data = await itemRequest.delete(categoryId, itemId);

    if (data.success === true) {
      dispatch({
        type: actionTypes.ITEM_REQUEST_SUCCESS,
        keyState: "delete",
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.ITEM_REQUEST_FAILED,
        keyState: "delete",
        payload: null,
      });
    }
  },

  update:
    ({ itemId, name, desc, image, price }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.ITEM_REQUEST_LOADING,
        keyState: "update",
        payload: null,
      });

      const jsonData = {
        name,
        desc,
        image,
        price,
      };

      let data = await itemRequest.update(itemId, jsonData);

      if (data.success === true) {
        dispatch({
          type: actionTypes.ITEM_REQUEST_SUCCESS,
          keyState: "update",
          payload: data.result,
        });
        dispatch({
          type: actionTypes.ITEM_CURRENT_ITEM,
          payload: data.result,
        });
      } else {
        dispatch({
          type: actionTypes.ITEM_REQUEST_FAILED,
          keyState: "update",
          payload: null,
        });
      }
    },

  read: (itemId) => async (dispatch) => {
    dispatch({
      type: actionTypes.ITEM_REQUEST_LOADING,
      keyState: "read",
      payload: null,
    });

    let data = await itemRequest.read(itemId);

    if (data.success === true) {
      dispatch({
        type: actionTypes.ITEM_CURRENT_ITEM,
        payload: data.result,
      });
      dispatch({
        type: actionTypes.ITEM_REQUEST_SUCCESS,
        keyState: "read",
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.ITEM_REQUEST_FAILED,
        keyState: "read",
        payload: null,
      });
    }
  },
};

/****
export const crud = {
  search: (entity, source, option) => async (dispatch) => {
    dispatch({
      type: actionTypes.ITEM_REQUEST_LOADING,
      keyState: "search",
      payload: null,
    });

    source.cancel();

    source = request.source();
    let data = await request.search(entity, source, option);

    if (data.success === true) {
      dispatch({
        type: actionTypes.ITEM_REQUEST_SUCCESS,
        keyState: "search",
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.ITEM_REQUEST_FAILED,
        keyState: "search",
        payload: null,
      });
    }
  },
};
****/
