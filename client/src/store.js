import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { siteDetailReducer, siteUpdateReducer } from "./reducers/siteReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  siteDetail: siteDetailReducer,
  siteUpdate: siteUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk, logger];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
