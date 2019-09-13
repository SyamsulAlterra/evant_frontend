import React from "react";
import InvitationCard from "../components/InvitationCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Invitations extends React.Component {
  render() {
    return (
      <div className="Invitations">
        <Header></Header>
        {[...Array(5).keys()].map(value => {
          return <InvitationCard></InvitationCard>;
        })}
        <Footer></Footer>
      </div>
    );
  }
}

export default Invitations;
