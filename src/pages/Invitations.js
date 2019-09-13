import React from "react";
import InvitationCard from "../components/InvitationCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "unistore/react";
import { actions } from "../Store";

class Invitations extends React.Component {
  render() {
    if (this.props.invitations.length < 1) {
      return (
        <div className="Invitations">
          <Header></Header>
          <h3 className="text-center">
            You don't have any event invitation(s) yet
          </h3>
          <Footer></Footer>
        </div>
      );
    } else {
      return (
        <div className="Invitations">
          <Header></Header>
          {this.props.invitations.map(value => {
            return <InvitationCard></InvitationCard>;
          })}
          <Footer></Footer>
        </div>
      );
    }
  }
}

export default connect(
  "baseUrl, invitations",
  actions
)(Invitations);
