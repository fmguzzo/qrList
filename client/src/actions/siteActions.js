import axios from "axios";
import {
  SITE_DETAILS_FAIL,
  SITE_DETAILS_REQUEST,
  SITE_DETAILS_SUCCESS,
  SITE_UPDATE_PROFILE_FAIL,
  SITE_UPDATE_PROFILE_REQUEST,
  SITE_UPDATE_PROFILE_SUCCESS,
  SITE_UPDATE_PROFILE_RESET,
} from "../constants/siteConstants";

export const getSiteDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SITE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/sites/${userInfo.idSite}`, config);

    dispatch({
      type: SITE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SITE_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateSiteProfile = (site) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SITE_UPDATE_PROFILE_REQUEST,
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
      `/api/sites/${userInfo.idSite}`,
      site,
      config
    );

    dispatch({
      type: SITE_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SITE_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};
