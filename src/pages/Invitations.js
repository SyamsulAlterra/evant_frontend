import React from "react";

import InvitaionCard from "../components/InvitationCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InvitationCard from "../components/InvitationCard";


class Invitations extends React.Component {
  render() {
    return (
      <div className="Invitations">
        <Header></Header>
        {[...Array(5).keys()].map(value => {
          return <InvitaionCard></InvitaionCard>;
        })}
        <Footer></Footer>
      </div>
    );
  }
}

export default Invitations;
