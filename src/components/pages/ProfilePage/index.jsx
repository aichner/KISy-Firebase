//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect, withRouter } from "react-router-dom";

//> Additional modules
// Firebase
import firebase from "firebase";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import { signOut } from "../../../store/actions/authActions";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardUp,
  MDBAvatar,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
  MDBIcon,
  MDBBadge,
} from "mdbreact";

//> Components
import { FormCat } from "../../organisms";

//> CSS
import "./profilepage.scss";

//> Images
import { ReactComponent as MorningImg } from "../../../assets/icons/morning.svg";
import { ReactComponent as DayImg } from "../../../assets/icons/day.svg";
import { ReactComponent as NightImg } from "../../../assets/icons/night.svg";

class ProfilePage extends React.Component {
  state = {};

  componentDidMount = () => {
    // Load welcoming picture
    this.getGreetingImg();
  };

  getGreetingTxt = () => {
    // Get date
    let today = new Date();
    // Get current hours
    let curHr = today.getHours();

    // Store selected greeting
    let selected = null;
    console.log(curHr);
    if (curHr > 5) {
      selected = <span>Guten Morgen</span>;
    } else if (curHr > 11) {
      selected = <span>Willkommen zurück</span>;
    } else if (curHr > 18 || curHr > 0) {
      selected = <span>Guten Abend</span>;
    }

    return selected;
  };

  getGreetingImg = () => {
    // Get date
    let today = new Date();
    // Get current hours
    let curHr = today.getHours();

    if (curHr > 5) {
      this.setState({ greetingImage: <MorningImg className="img-fluid" /> });
    } else if (curHr > 11) {
      this.setState({ greetingImage: <DayImg className="img-fluid" /> });
    } else if (curHr > 18 || curHr > 0) {
      this.setState({ greetingImage: <NightImg className="img-fluid" /> });
    }
  };

  render() {
    const { auth, profile } = this.props;
    console.log(auth, profile);
    // Check if firebase has loaded profile data
    if (!profile.isLoaded) {
      return (
        <MDBContainer className="flex-center my-5 py-5">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </MDBContainer>
      );
    } else {
      // Check if logged in
      if (auth.uid === undefined) return <Redirect to="/" />;

      return (
        <div id="profile">
          <div className="greeting py-5 text-center">
            {this.state.greetingImage}
            <h2 className="text-center font-weight-bold">
              {this.getGreetingTxt()} <span>{profile.first_name}</span>!
            </h2>
            <MDBBtn color="white" outline onClick={() => this.props.signOut()}>
              Sign Out
            </MDBBtn>
          </div>
          <div className="py-4 greeting-actions">
            <MDBContainer>
              <MDBRow className="flex-center">
                <MDBCol md="2" className="text-center">
                  <p className="lead">
                    <MDBIcon icon="bolt" className="pr-2 orange-text" />
                    Quick actions
                  </p>
                </MDBCol>
                <MDBCol md="5" className="text-center">
                  <MDBBtn color="indigo">
                    <MDBIcon icon="history" />
                    History
                  </MDBBtn>
                  <MDBBtn color="elegant">
                    <MDBIcon far icon="file" />
                    Meine Dokumente
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
          <div className="main">
            <MDBContainer className="py-5">
              <MDBRow className="justify-content-center">
                <MDBCol md="7">
                  <MDBCard className="w-100">
                    <MDBCardBody>
                      <FormCat />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="3" className="text-center">
                  <MDBCard className="w-100" testimonial>
                    <MDBCardUp className="indigo lighten-3" />
                    <MDBAvatar className="mx-auto white">
                      <img
                        src={
                          "https://www.aichner-christian.com/img/kisy/" +
                          profile.image
                        }
                        alt=""
                      />
                    </MDBAvatar>
                    <MDBCardBody>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="What are you doing?"
                      />
                      <p className="lead mb-3">0:00</p>
                      <MDBBtn outline color="indigo" className="w-100 mx-0">
                        <MDBIcon far icon="pause-circle" />
                        Pause
                      </MDBBtn>
                      <MDBBtn color="indigo" className="w-100 mx-0">
                        <MDBIcon icon="stopwatch" />
                        Start
                      </MDBBtn>
                      <MDBBtn color="indigo" className="w-100 mx-0">
                        <MDBIcon icon="stop-circle" />
                        Stop
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfilePage));

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */