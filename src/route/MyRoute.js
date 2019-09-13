import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "unistore/react";
import { Store } from "../Store";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Invitations from "../pages/Invitations";
import Events from "../pages/Events";
import HomePage from "../pages/HomePage";
import EventDetails from "../pages/EventDetails";
import ProfilPage from "../pages/ProfilePage";
import CreateEvent from "../pages/CreateEvent";

class MyRoute extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={Store}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/invitations" component={Invitations} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/events/create" component={CreateEvent} />
            <Route exact path="/profile" component={ProfilPage} />
            <Route path="/events/:id" component={EventDetails} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}

export default MyRoute;
