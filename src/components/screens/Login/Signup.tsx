import * as React from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Card from "../../structure/Card";
import { error } from "../../structure/Alert";

import { UserAPI } from "../../../api";

import * as UserActions from "../../../reducers/userReducer";
import { bindActionCreators } from "redux";

interface ISignupScreenProps {
  alertsActions: any;
  schoolActions: any;
  userActions: any;
  setupActions: any;
  userState: any;
  history: any;
}

const helpText = ``;
class Signup extends React.Component<ISignupScreenProps, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      step: 1,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
  }

  public async handleSubmit() {
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const password = this.state.password;
    if (firstName === "" || lastName === "" || email === "" || password === "") {
      return error("All fields are required!")
    }
    this.setState({ loading: true }, async () => {
      try {
        await UserAPI.signup(firstName, lastName, email, password);
        this.setState({ loading: false, step: 2 });

      } catch (e) {
        error("Could not log you in.");
        this.setState({ loading: false });
      }
    });
  }

  public render() {
    if (this.props.userState.loggedIn) {
      return (<Redirect
        to="/dashboard" />);
    }
    if (this.state.step === 2) {
      return (
        <div className="row justify-content-md-center">
          <div className="col-6">
            <Card title="Verify your Email" help={helpText}>
              <div className="row">
                <div className="col-12">
                  <strong>Thanks for registering!</strong>
                  <p>You need to check your email to confirm your account. A code should be sent momentarily. If you do not receive your code within 10 minutes, please contact support or try to register again. Thanks!</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="row justify-content-md-center">
        <div className="col-6">
          {!this.props.userState.loggedIn ? (
            <Card title="Signup" help={helpText}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" id="firstName" className="form-control" value={this.state.firstName} onChange={this.updateField} onKeyUp={this.checkEnter} />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" id="lastName" className="form-control" value={this.state.lastName} onChange={this.updateField} onKeyUp={this.checkEnter} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" id="email" className="form-control" value={this.state.email} onChange={this.updateField} onKeyUp={this.checkEnter} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password" className="form-control" value={this.state.password} onChange={this.updateField} onKeyUp={this.checkEnter} />
                  </div>
                  <div className="form-group">
                    {this.state.loading ? (<div className="glyphicon glyphicon-repeat normal-right-spinner" style={{ textAlign: "center", width: "100%" }} />) :
                      (<button className="btn btn-block btn-primary" onClick={this.handleSubmit}>Signup</button>)}

                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 pull-right">
                  <Link to="/login">Login</Link><br />
                </div>
                <div className="col-6 pull-right">
                  <Link to="/reset">Forgot?</Link><br />
                </div>
              </div>
            </Card>) : (
              <Card title="Signup">
                <div className="row">
                  <div className="col-md-6">
                    You are logged in!
              </div>
                </div>
              </Card>
            )}
        </div>
      </div>
    );
  }

  private updateField(e: any) {
    const ns: any = this.state;
    ns[e.target.id] = e.target.value;
    this.setState(ns);
  }

  private checkEnter(e: any) {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }
}


const mapStateToProps = function map(s: any) {
  return {
    userState: s.userState
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup) as any);