import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../Store";
import FriendsCard from "../components/FriendsCard";
import searchFriends from "../images/searchFriends.png";
import { withRouter, Link } from "react-router-dom";

class InviteFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uninvitedUser: [],
      searchResult: []
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
    let result = response.data.filter(user => {
      let dup = this.props.participants.filter(participant => {
        return participant.user_id === user.user_id;
      });

      return dup.length === 0;
    });

    let resultFiltered = result.filter(user => {
      return user.user_id.toString() !== localStorage.getItem("user_id");
    });

    await this.setState({
      uninvitedUser: resultFiltered,
      searchResult: resultFiltered
    });
  };

  searchUser = e => {
    let key = e.target.value;
    let result = this.state.uninvitedUser.filter(user => {
      let currentResult1 = user.username.search(key);
      let currentResult2 = user.fullname.search(key);
      return currentResult1 !== -1 || currentResult2 !== -1;
    });
    this.setState({ searchResult: result });
  };

  render() {
    return (
      <div className="InviteFriends">
        <Header></Header>
        <div className="vh-100 mbForFooter InviteFriendContent">
          <div className="text-center mobileView container animated fadeIn">
            <div className="row justify-content-center">
              <input
                type="text"
                placeholder="search by username"
                className="text-center my-3"
                onChange={this.searchUser}
              ></input>
              {/* <img
                className="searchFriends my-3 mx-2"
                alt=""
                src={searchFriends}
              ></img> */}
            </div>
          </div>
          <div className="container mobileView text-center">
            {this.state.searchResult.map(user => {
              return <FriendsCard user={user}></FriendsCard>;
            })}
          </div>
          <div className="text-center">
            <Link to="/events/create" className="m-3 btn buttonCancelInvite">
              Cancel
            </Link>
          </div>
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
