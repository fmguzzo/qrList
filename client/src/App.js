import "./App.css";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import ListsListScreen from "./screens/ListsListScreen";
import AddListScreen from "./screens/AddListScreen";
import EditListScreen from "./screens/EditListScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/lists" component={ListsListScreen} exact />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/lists/edit/:listId" component={EditListScreen} exact />
          <Route path="/lists/add" component={AddListScreen} exact />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
