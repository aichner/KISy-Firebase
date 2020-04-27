//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect } from "react-router-dom";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import { getZombies } from "../../../store/actions/authActions";

//> Additional modules
// Copy to clipboard
import copy from "copy-to-clipboard";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBDataTable,
  MDBRow,
  MDBCol,
  MDBPopover,
  MDBPopoverHeader,
  MDBPopoverBody,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBBadge,
  MDBIcon,
  MDBFormInline,
  MDBInput,
  MDBAlert,
  MDBSpinner,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

//> Components
import { ResultChart } from "../../molecules/charts";

//> CSS
import "./zombie.scss";

class ZombieList extends React.Component {
  state = {
    data: {
      columns: [
        {
          label: "Chart",
          field: "chart",
          sort: "disabled",
        },
        {
          label: "Company",
          field: "company",
          sort: "disabled",
        },
        {
          label: "City",
          field: "city",
          sort: "disabled",
        },
        {
          label: "Contact",
          field: "contact",
          sort: "disabled",
        },
        {
          label: "Nutzerdaten",
          field: "access",
          sort: "disabled",
        },
      ],
      rows: undefined,
    },
  };

  componentWillReceiveProps(nextProps) {
    // Check if zombies have changed
    if (
      JSON.stringify(this.props.zombies) !== JSON.stringify(nextProps.zombies)
    ) {
      nextProps.zombies &&
        this.setState({ sync: false }, () => this.fillTable(nextProps.zombies));
    } else {
      this.setState({ sync: false });
    }
  }

  toggle = (cat) => {
    if (!this.state.modal) {
      this.setState({
        modal: true,
        modalCat: {
          ...cat,
        },
      });
    } else {
      this.setState({
        modal: false,
        modalUser: undefined,
      });
    }
  };

  getUserList = (zombies) => {
    return (
      zombies &&
      zombies.map((cat, i) => {
        if (!cat.disabled) {
          return {
            chart: (
              <div>
                <ResultChart
                  data={cat.analysis[cat.analysis.length - 1].results}
                  hideLabels
                />
              </div>
            ),
            company: (
              <>
                <p>{cat.company_name}</p>
                <MDBBtn
                  color="indigo"
                  className="px-3 m-0 mr-2"
                  size="sm"
                  onClick={() => this.toggle(cat)}
                >
                  <MDBIcon icon="chart-area" />
                  Analysis
                </MDBBtn>
              </>
            ),
            city: cat.city,
            contact: (
              <>
                <p className="mb-1 clickable" onClick={() => copy(cat.email)}>
                  {cat.email} <MDBIcon far icon="copy" />
                </p>
                {cat.phone ? <p className="mb-1">{cat.phone}</p> : null}
              </>
            ),
            access: (
              <>
                <p className="mb-1">E-Mail: {cat.email}</p>
                <p
                  className="mb-0 clickable"
                  onClick={() => copy(cat.password)}
                >
                  Password: {cat.password} <MDBIcon far icon="copy" />
                </p>
              </>
            ),
          };
        }
      })
    );
  };

  fillTable = (zombies) => {
    this.setState({
      data: {
        ...this.state.data,
        rows: this.getUserList(zombies),
      },
    });
  };

  render() {
    const { auth, profile, zombies } = this.props;

    if (!profile.isLoaded) {
      return (
        <MDBContainer className="flex-center my-5 py-5">
          <MDBSpinner />
        </MDBContainer>
      );
    } else {
      // Check if logged in
      if (auth.uid === undefined) return <Redirect to="/" />;
      if (profile && !profile.coach) return <Redirect to="/" />;

      // Get firebase zombies
      if (!this.props.zombies) {
        this.props.getZombies();
      } else {
        if (!this.state.data.rows) {
          this.fillTable(this.props.zombies);
        }
      }

      return (
        <>
          <div id="zombielist">
            <>
              <MDBCard className="w-100">
                <MDBCardBody>
                  <h2 className="d-flex">
                    <MDBBadge color="indigo" className="mr-3">
                      Phase 2
                    </MDBBadge>{" "}
                    Zombies
                  </h2>
                  <p className="lead">
                    Phase 2 tries to transform <code>cats</code> into{" "}
                    <code>interested</code>.
                  </p>
                  <div className="text-right mb-4">
                    {this.state.removeCat && (
                      <>
                        <MDBBtn
                          className="px-3 m-0"
                          color="danger"
                          onClick={() => {
                            this.props.removeCat(this.state.removeCat.uid);
                            this.setState({ removeCat: undefined });
                          }}
                        >
                          <MDBIcon icon="check" />
                          Remove {this.state.removeCat.name}
                        </MDBBtn>
                        <MDBBtn
                          className="px-3 ml-2"
                          color="elegant"
                          outline
                          onClick={() =>
                            this.setState({ removeCat: undefined })
                          }
                        >
                          Cancel
                        </MDBBtn>
                      </>
                    )}
                  </div>
                  <MDBDataTable
                    striped
                    bordered
                    searching={false}
                    paging={false}
                    exportToCSV
                    entriesOptions={[10, 20, 50, 100]}
                    data={this.state.data}
                  />
                </MDBCardBody>
              </MDBCard>
            </>
          </div>
          {this.state.modal && this.state.modalCat && (
            <MDBModal
              modalStyle="primary"
              className="text-white"
              size="md"
              backdrop={true}
              isOpen={this.state.modal}
              toggle={this.toggle}
            >
              <MDBModalHeader
                className="text-center"
                titleClass="w-100"
                tag="p"
              >
                {this.state.modalCat.company_name} Analysis Details
              </MDBModalHeader>
              <MDBModalBody className="text-center">
                {this.state.modalCat && (
                  <ResultChart
                    data={
                      this.state.modalCat.analysis[
                        this.state.modalCat.analysis.length - 1
                      ].results
                    }
                  />
                )}
              </MDBModalBody>
              <MDBModalFooter className="justify-content-center">
                <MDBBtn color="elegant" outline onClick={this.toggle}>
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          )}
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    zombies: state.auth.zombies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getZombies: () => dispatch(getZombies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ZombieList);

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Christian Aichner
 */