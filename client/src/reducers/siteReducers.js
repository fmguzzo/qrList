import {
  SITE_DETAILS_FAIL,
  SITE_DETAILS_REQUEST,
  SITE_DETAILS_SUCCESS,
  SITE_DETAILS_RESET,
  SITE_UPDATE_PROFILE_FAIL,
  SITE_UPDATE_PROFILE_REQUEST,
  SITE_UPDATE_PROFILE_SUCCESS,
  SITE_UPDATE_PROFILE_RESET,
} from "../constants/siteConstants";

export const siteDetailReducer = (state = { site: {} }, action) => {
  switch (action.type) {
    case SITE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SITE_DETAILS_SUCCESS:
      return { loading: false, site: action.payload };
    case SITE_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SITE_DETAILS_RESET:
      return { site: {} };
    default:
      return state;
  }
};

export const siteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SITE_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case SITE_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, site: action.payload };
    case SITE_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case SITE_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
