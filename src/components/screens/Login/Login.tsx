import * as React from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Card from "../../structure/Card";
import { error } from "../../structure/Alert";

import { UserAPI } from "../../../api";

import * as UserActions from "../../../reducers/userReducer";
import { bindActionCreators } from "redux";

interface ILoginScreenProps {
  alertsActions: any;
  schoolActions: any;
  userActions: any;
  setupActions: any;
  userState: any;
  history: any;
}

const helpText = ``;
class Login extends React.Component<ILoginScreenProps, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
  }

  public async handleSubmit() {
    this.setState({loading: true}, async () => {
      
      try {
        const result = await UserAPI.loginUser(this.state.email, this.state.password);
        const user = result.body.data;

        window.localStorage.jwt = user.jwt;
        window.localStorage.user = JSON.stringify(user);
        document.cookie = "jwt=" + user.jwt;

        // set the action
        this.props.userActions.loginUser({loggedIn: true, user});

      } catch (e) {
        error("Could not log you in.");
        this.setState({loading: false});
      }
    });
  }

  public render() {
    if(this.props.userState.loggedIn){
      return (<Redirect
        to="/" />);
    }

    return (
      <div className="row justify-content-md-center">
        <div className="col-6">
          {!this.props.userState.loggedIn ? (
            <Card title="Login" help={helpText}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" id="email" className="form-control" value={this.state.email} onChange={this.updateField} onKeyUp={this.checkEnter} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password" className="form-control" value={this.state.password} onChange={this.updateField} onKeyUp={this.checkEnter} />
                  </div>
                  <div className="form-group">
                    {this.state.loading ? (<div className="glyphicon glyphicon-repeat normal-right-spinner" style={{textAlign: "center", width: "100%"}} />) :
                      (<button className="btn btn-block btn-primary" onClick={this.handleSubmit}>Login</button>)}
                    
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 pull-right">
                  <Link to="/signup">Signup</Link><br />
                </div>
                <div className="col-6 pull-right">
                  <Link to="/reset">Forgot?</Link><br />
                </div>
              </div>
            </Card>) : (
              <Card title="Login">
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

  private checkEnter(e: any){
    if(e.keyCode === 13) {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login) as any);