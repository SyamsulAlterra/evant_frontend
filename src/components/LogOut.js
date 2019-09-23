import React from "react";
import logout from "../images/logout.png";
import { Link } from "react-router-dom";

class Logout extends React.Component {
    handleClick = () => {
        localStorage.clear();
    };

    render() {
        return (
            <div className="btn m-0" onClick={this.handleClick}>
                <Link to="/">
                    <img alt="logout" src={logout} className="avatar"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="LogOut"
                    ></img>
                    <br></br>
                    <span className="BiruTua">SignOut</span>
                </Link>
            </div>
        );
    }
}

export default Logout;
