import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Card from "../../structure/Card";
import { error } from "../../structure/Alert";
import { SiteAPI } from "../../../api";
import * as AppActions from "../../../reducers/appReducer";

interface ISiteSetupProps {
  appActions: any;
  history: any;
}

interface ISiteSetupState {
  loading: boolean;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  siteName: string;
  siteDescription: string;
  secretKey: string;
}

class SiteSetup extends React.Component<ISiteSetupProps, ISiteSetupState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      siteName: "",
      siteDescription: "",
      secretKey: "",
    };

    this.updateField = this.updateField.bind(this);
    this.completeSetup = this.completeSetup.bind(this);
  }

  public render() {
    return (
      <Card title="Setup" loading={this.state.loading} help="">
        <div className="row">
          <div className="col-md-6">
            <h3>About You</h3>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" id="firstName" value={this.state.firstName} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" id="email" value={this.state.email} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" id="username" value={this.state.username} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.updateField} />
            </div>
          </div>
          <div className="col-md-6">
            <h3>About the Site</h3>
            <div className="form-group">
              <label>Site Name</label>
              <input type="text" className="form-control" id="siteName" value={this.state.siteName} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Site Secret Key </label>
              <span className="small"> This is the code shown when starting up the new server</span>
              <input type="text" className="form-control" id="secretKey" value={this.state.secretKey} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Site Subtitle or Description</label>
              <input type="text" className="form-control" id="siteDescription" value={this.state.siteDescription} onChange={this.updateField} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button className="btn btn-block btn-primary" onClick={this.completeSetup}>Complete Setup</button>
          </div>
        </div>
      </Card>
    );
  }

  private updateField(e: any){
    const ns = this.state;
    ns[e.target.id] = e.target.value;
    this.setState(ns);
  }

  private async completeSetup(){
    const firstName = this.state.firstName.trim();
    const lastName = this.state.lastName.trim();
    const email = this.state.email.trim();
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    const secretKey = this.state.secretKey.trim();
    const siteDescription = this.state.siteDescription.trim();
    const siteName = this.state.siteName.trim();

    // make sure none are blank
    if(firstName === "" || lastName === "" || email === "" || username === "" || password === "" || secretKey === "" || siteDescription === "" || siteName === ""){
      return error("All fields are required and cannot be blank");
    }

    this.setState({ loading: true}, async () => {
      try{
        const result = await SiteAPI.setupSite(firstName, lastName, email, username, password, siteName, siteDescription, secretKey);
        if(result.body.data.active){
          // so, grab the data and update the model
          const siteInfoRes = await SiteAPI.getSiteInfo();
          const siteInfo = siteInfoRes.body.data;
          this.props.appActions.setSiteInfo(siteInfo);
        }
      }catch(e){
        this.setState({loading: false}, () => {
          return error("Could not setup that site. Please verify your information and try again");
        });
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
    appActions: bindActionCreators(AppActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteSetup) as any);