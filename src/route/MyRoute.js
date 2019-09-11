import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "unistore/react";
import { Store } from "../Store";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CalendarPage from "../pages/CalendarPage";

class MyRoute extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={Store}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/calendar" component={CalendarPage} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}

export default MyRoute;
