import React from "react";
import InvitationCard from "../components/InvitationCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "unistore/react";
import { actions } from "../Store";
import Axios from "axios";

class Invitations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: []
    };
  }

  componentWillMount = async () => {
    let config = {
      url: this.props.baseUrl + "invitations",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    await this.props.setInvitationsOnGlobal(response.data);
    await this.setState({ searchResult: this.props.invitations });
    window.scrollTo(0, 0);
  };

  search = async e => {
    let searchKey = e.target.value;

    let result = this.props.invitations.filter(invitation => {
      console.log(invitation);
      let eventName = invitation.event_name;
      let category = this.props.verboseCategory[invitation.event_category];
      let inviteeName = invitation.username_creator;

      let output1 = eventName.search(searchKey);
      let output2 = category.search(searchKey);
      let output3 = inviteeName.search(searchKey);

      console.log(output1, output2, output3);

      return output1 !== -1 || output2 !== -1 || output3 !== -1;
    });

    await this.setState({ searchResult: result });
  };
  render() {
    console.log(this.state.searchResult);
    if (this.props.invitations.length < 1) {
      return (
        <div className="Invitations">
          <Header></Header>
          <div className="h-400 my-5">
            <h3 className="text-center animated fadeIn p-3 f-15">
              You don't have any event invitation(s) yet
            </h3>
          </div>
          <Footer></Footer>
        </div>
      );
    } else {
      return (
        <div className="Invitations mbForFooter">
          <Header></Header>
          <div className="invitationCardsMap mobileView container">
            <h2 className="text-center">My Invitations</h2>
            <div className="row">
              <div className="col-12 text-center">
                <input
                  type="text"
                  className="text-center invitationSearch"
                  placeholder="search invitation"
                  onChange={this.search}
                ></input>
              </div>
            </div>
          </div>
          {this.state.searchResult.map(invitation => {
            return <InvitationCard invitation={invitation}></InvitationCard>;
          })}
          <Footer></Footer>
        </div>
      );
    }
  }
}

export default connect(
  "baseUrl, invitations, verboseCategory",
  actions
)(Invitations);
