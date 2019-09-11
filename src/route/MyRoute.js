import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "unistore/react";
import Login from "../pages/Login";
import { Store } from "../Store";

class MyRoute extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={Store}>
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}

export default MyRoute;
