import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../Store";
import FriendsCard from "../components/FriendsCard";
import searchFriends from "../images/searchFriends.png";
import { withRouter } from "react-router-dom";

class InviteFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uninvitedUser: []
    };
  }

  componentDidMount = async (prevProps, prevState) => {
    let config = {
      url: this.props.baseUrl + "users",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    if (this.props.participants.length === 0) {
      let result = response.data.filter(user => {
        return user.user_id.toString() !== localStorage.getItem("user_id");
      });
      await this.setState({ uninvitedUser: result });
    } else {
      let result = response.data.filter(user => {
        let dup = this.props.participants.filter(participant => {
          console.log(
            participant.user_id,
            user.user_id,
            participant.user_id === user.user_id
          );
          return participant.user_id === user.user_id;
        });

        console.log(dup);
        return dup.length === 0;
      });

      let resultFiltered = result.filter(user => {
        return user.user_id.toString() !== localStorage.getItem("user_id");
      });

      console.log(resultFiltered);
      this.setState({ uninvitedUser: resultFiltered });
    }
  };

  goBack = () => {
    this.props.history.push("/events/create");
  };

  render() {
    return (
      <div className="InviteFriends">
        <Header></Header>
        <div className="text-center mobileView container">
          <input
            type="text"
            placeholder="search by username"
            className="text-center my-3"
          ></input>
          <img className="searchFriends mx-2" alt="" src={searchFriends}></img>
        </div>
        <div className="container mobileView text-center">
          {this.state.uninvitedUser.map(user => {
            return <FriendsCard user={user}></FriendsCard>;
          })}
        </div>
        <div className="text-center">
          <button className="m-3" onClick={this.goBack}>
            Cancel
          </button>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  "baseUrl, participants",
  actions
)(withRouter(InviteFriends));
