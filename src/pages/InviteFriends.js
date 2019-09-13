import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../Store";
import FriendsCard from "../components/FriendsCard";
import searchFriends from "../images/searchFriends.png";

class InviteFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: []
    };
  }
  componentDidMount = async () => {
    let config = {
      url: this.props.baseUrl + "users",
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    let response = await Axios(config);
    this.setState({ allUser: response.data });
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
          {this.state.allUser.map(user => {
            return <FriendsCard user={user}></FriendsCard>;
          })}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(
  "baseUrl",
  actions
)(InviteFriends);
