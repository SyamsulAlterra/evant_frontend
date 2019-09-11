import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "unistore/react";
import { store } from "../components/store";


class MyRoute extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Switch>
          </Switch>
        </Provider>
      </Router>
    );
  }
}

export default MyRoute;
