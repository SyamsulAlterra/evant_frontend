import React from "react";
import fotoProfil from "../images/profile.png";
import FormEditProfile from "./FormEditProfile";
import FormChangePassword from "./FormChangePassword";

class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <div className="container mobileView">
          <div className="row border my-4">
            <div className="col text-center">
              <h3 className="mt-4 mb-0">Muhammad Syamsul Arifin</h3>
              <img src={fotoProfil} className="profileImage m-3"></img>
              <div className="text-left p-0">
                <span className="m-0">username: @culcalcul</span>
                <br></br>
                <span className="m-0">address: Jln Mandalajati No. 13</span>
                <br></br>
                <span className="m-0">email: syamsul@alterra.id</span>
                <br></br>
                <span className="m-0">phone: 0856XXX</span>
                <br></br>
                <span className="m-0">gender: Male</span>
                <br></br>
              </div>
              <div className="row">
                <div className="col-6 p-0">
                  <button
                    className="btn btn-info my-3 p-1"
                    data-toggle="modal"
                    data-target="#editProfile"
                  >
                    Edit My Profile
                  </button>
                </div>
                <div className="col-6 p-0">
                  <button
                    className="btn btn-info my-3 p-1"
                    data-toggle="modal"
                    data-target="#changePassword"
                  >
                    Change Password
                  </button>
                </div>
                {/* modal edit profile */}
                <div
                  class="modal fade"
                  id="editProfile"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Edit Profile
                        </h5>
                      </div>
                      <div class="modal-body">
                        <FormEditProfile></FormEditProfile>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-dismiss="modal"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* modal change password */}
                <div
                  class="modal fade"
                  id="changePassword"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Change Password
                        </h5>
                      </div>
                      <div class="modal-body">
                        <FormChangePassword></FormChangePassword>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-dismiss="modal"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
