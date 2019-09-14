import React from "react";
import avatar from "../images/avatar.png";
import addFriend from "../images/addFriend.png";
import { connect } from "unistore/react";
import { actions } from "../Store";
import { withRouter } from "react-router-dom";

class ParticipantCard extends React.Component {
    render() {
        return (
            <div className="invitationCard">
                <div class="card my-2 centering">
                    <div class="card-body p-2">
                        <div className='container'>
                            <div class="row">
                                <div className="col-2 p-0">
                                    <img alt="" src={avatar} className="m-1 avatar"></img>
                                </div>
                                <div className="col-6 p-0">
                                    <p class="m-0 text-left">{this.props.user.fullname}</p>
                                    <p class="m-0 text-left">@{this.props.user.username}</p>
                                </div>
                                <div className="col-4 p-0">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    "baseUrl",
    actions
)(withRouter(ParticipantCard));
