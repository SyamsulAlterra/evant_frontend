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
import InviteFriends from "../pages/InviteFriends";
import CreateEvent from "../pages/CreateEvent";
import EventHistoryDetail from "../pages/EventHistoryDetail";
import Transition from "../components/Transition";
import EditDate from "../pages/EditDate";
import EventDetailParticipant from "../pages/EventDetailParticipant";
import PrepareEdit from "../pages/PrepareEditTanggal";
import Suggestion from "../pages/Suggestion";
import PendingEvent from "../components/PendingEvent";
import Confirmation from "../pages/Confirmation";
import GeneratedEvent from "../pages/GeneratedEvent";
import Unmatch from "../components/Unmatch";
import GoogleRegister from "../pages/RegisterWithGoogle";
import LoadingGenerate from "../components/LoadingGenerate";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";

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
            <Route exact path="/invite" component={InviteFriends} />
            <Route exact path="/prepareDate" component={PrepareEdit} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route path="/editDate/:event_id" component={EditDate} />
            <Route path="/suggestion/:id" component={Suggestion} />
            <Route path="/editDate/:event_id" component={EditDate} />
            <Route path="/pending/:id" component={PendingEvent} />
            <Route path="/transition/:id" component={Transition} />
            <Route path="/history/:id" component={EventHistoryDetail} />
            <Route path="/creator/:id" component={EventDetails} />
            <Route path="/participant/:id" component={EventDetailParticipant} />
            <Route path="/confirmation/:id" component={Confirmation} />
            <Route path="/generated/:id" component={GeneratedEvent} />
            <Route path="/unmatch/:id" component={Unmatch} />
            <Route path="/googleRegister" component={GoogleRegister} />
            <Route path="/calculate/:id" component={LoadingGenerate} />
            <Route component={NotFound} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}

export default MyRoute;
