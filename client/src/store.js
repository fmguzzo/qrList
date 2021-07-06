import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { siteDetailReducer, siteUpdateReducer } from "./reducers/siteReducers";
import {
  listDeleteReducer,
  listListReducer,
  listUpdateReducer,
  listDetailsReducer,
  listCreateReducer,
} from "./reducers/listReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  siteDetail: siteDetailReducer,
  siteUpdate: siteUpdateReducer,
  listList: listListReducer,
  listDelete: listDeleteReducer,
  listDetails: listDetailsReducer,
  listUpdate: listUpdateReducer,
  listCreate: listCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

//const middleware = [thunk, logger];
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
