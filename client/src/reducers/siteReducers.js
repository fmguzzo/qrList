import {
  SITE_DETAILS_FAIL,
  SITE_DETAILS_REQUEST,
  SITE_DETAILS_SUCCESS,
  SITE_UPDATE_PROFILE_FAIL,
  SITE_UPDATE_PROFILE_REQUEST,
  SITE_UPDATE_PROFILE_SUCCESS,
  SITE_UPDATE_PROFILE_RESET,
} from "../constants/siteConstants";

export const siteDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case SITE_DETAILS_REQUEST:
      return { loading: true };
    case SITE_DETAILS_SUCCESS:
      return { loading: false, site: action.payload };
    case SITE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const siteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SITE_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case SITE_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case SITE_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case SITE_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
