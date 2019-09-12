import React from "react";
import InvitaionCard from "../components/InvitationCard";

class Invitations extends React.Component {
  render() {
    return (
      <div className="Invitations">
        {[...Array(2).keys()].map(value => {
          return <InvitaionCard></InvitaionCard>;
        })}
      </div>
    );
  }
}

export default Invitations;
