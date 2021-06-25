import "./App.css";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import ListEditScreen from "./screens/ListEditScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/list" component={ListScreen} exact />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/list/:listId" component={ListEditScreen} exact />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
