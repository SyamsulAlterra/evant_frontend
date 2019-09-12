import React from "react";
import InvitationCard from "../components/InvitationCard";

class Invitations extends React.Component {
  render() {
    return (
      <div className="Invitations">
        {[...Array(2).keys()].map(value => {
          return <InvitationCard />;
        })}
      </div>
    );
  }
}

export default Invitations;
