import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Card from "../../structure/Card";
import { success, error } from "../../structure/Alert";
import * as UserActions from "../../../reducers/userReducer";
import { UserAPI } from "src/api";

interface IEditProfileProps {
  userActions: any;
}

interface IEditProfileState {
  loading: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
}

class EditProfile extends React.Component<IEditProfileProps, IEditProfileState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
    };

    this.updateField = this.updateField.bind(this);
    this.fetchProfile = this.fetchProfile.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
  }

  componentDidMount(){
    this.fetchProfile();
  }

  public render() {
    return (
      <Card title="EditProfile" loading={this.state.loading} help="">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" id="firstName" value={this.state.firstName} onChange={this.updateField} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.updateField} />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" id="username" value={this.state.username} onChange={this.updateField} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.updateField} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.updateField} />
        </div>
        <div className="form-group">
          <button className="btn btn-block btn-primary" onClick={this.saveProfile}>Save</button>
        </div>
      </Card>
    );
  }

  private updateField(e: any){
    const ns = this.state;
    ns[e.target.id] = e.target.value;
    this.setState(ns);
  }

  private fetchProfile(){
    this.setState({ loading: true }, async () => {
      try{
        const res = await UserAPI.getMyProfile();
        const data = res.body.data;
        this.setState({
          ...data,
          loading: false
        });
      }catch(e){
        this.setState({loading: false});
      }
    });
  }

  private saveProfile(){
    const firstName = this.state.firstName.trim();
    const lastName = this.state.lastName.trim();
    const email = this.state.email.trim();
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    if(firstName === "" || lastName === "" || email === "" || username === ""){
      return error("First Name, Last Name, Email, and Username cannot be blank");
    }
    this.setState({ loading: true }, async () => {
      try{
        const res = await UserAPI.updateMyProfile(
          firstName,
          lastName,
          email,
          password,
          username,
        );
        success("Profile Saved!");
        this.setState({loading: false});
        this.props.userActions.setUser(res.body.data);
      }catch(e){
        error("Could not update your profile. That username or email may already exist.");
        this.setState({loading: false});
      }
    });
  }

}


const mapStateToProps = function map(s: any) {
  return {
    appState: s.appState
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    userActions: bindActionCreators(UserActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile) as any);