import "./App.css";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ListsListScreen from "./screens/ListsListScreen";
import AddListScreen from "./screens/AddListScreen";
import EditListScreen from "./screens/EditListScreen";
import ListsCategoryScreen from "./screens/ListsCategoryScreen";
import EditCategoryScreen from "./screens/EditCategoryScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import ListsItemScreen from "./screens/ListsItemScreen";
import AddItemScreen from "./screens/AddItemScreen";
import EditItemScreen from "./screens/EditItemScreen";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Switch>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/lists" component={ListsListScreen} exact />
          <Route path="/lists/edit/:listId" component={EditListScreen} exact />
          <Route path="/lists/add" component={AddListScreen} exact />
          <Route
            path="/lists/:listId/category"
            component={ListsCategoryScreen}
            exact
          />
          <Route
            path="/lists/:listId/category/:categoryId/edit/"
            component={EditCategoryScreen}
            exact
          />
          <Route
            path="/lists/:listId/category/add"
            component={AddCategoryScreen}
            exact
          />
          <Route
            path="/category/:categoryId/item"
            component={ListsItemScreen}
            exact
          />
          <Route
            path="/category/:categoryId/item/:itemId/edit"
            component={EditItemScreen}
            exact
          />
          <Route
            path="/category/:categoryId/item/add"
            component={AddItemScreen}
            exact
          />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
