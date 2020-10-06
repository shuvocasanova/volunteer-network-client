import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import AddEvent from "./Components/AddEvent/AddEvent";
import Admin from "./Components/Admin/Admin";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import NotFound from "./Components/NotFound/NotFound";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Profile from "./Components/Profile/Profile";
import Register from "./Components/Register/Register";

export const userContext = createContext();

function App() {
  const [loginUser, setLoginUser] = useState({});
  return (
    <userContext.Provider value={[loginUser, setLoginUser]}>
      <Router>
        <div className="container flex-grow-1">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/register/:id">
              <Register />
            </PrivateRoute>
            <PrivateRoute path="/admin/addEvent">
              <AddEvent />
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <Admin />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </userContext.Provider>
  );
}

export default App;
