import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/Profile";

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="profilePage">
        <Header></Header>
        <Profile></Profile>
        <Footer></Footer>
      </div>
    );
  }
}

export default ProfilePage;
