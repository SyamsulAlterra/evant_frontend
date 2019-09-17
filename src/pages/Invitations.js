import React from "react";
import InvitationCard from "../components/InvitationCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "unistore/react";
import { actions } from "../Store";

class Invitations extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    if (this.props.invitations.length < 1) {
      return (
        <div className="Invitations">
          <Header></Header>
          <h3 className="text-center animated fadeIn">
            You don't have any event invitation(s) yet
          </h3>
          <Footer></Footer>
        </div>
      );
    } else {
      return (
        <div className="Invitations">
          <Header></Header>
          <div className="invitationCardsMap mbForFooter">
            <h2 className="text-center">My Invitations</h2>
            {this.props.invitations.map(invitation => {
              return <InvitationCard invitation={invitation}></InvitationCard>;
            })}
            <Footer></Footer>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  "baseUrl, invitations",
  actions
)(Invitations);
