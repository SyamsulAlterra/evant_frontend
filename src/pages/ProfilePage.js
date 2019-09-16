import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/Profile";

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="profilePage mbForFooter">
        <Header></Header>
        <div className="position">
          <Profile></Profile>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
