import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { SiteAPI } from "../../../api/";

import Card from "../../structure/Card";
import { error, success } from "../../structure/Alert";
import * as AppActions from "../../../reducers/appReducer";

interface ISiteSettingsProps {
  appActions: any;
  appState: any;
  history: any;
}

interface ISiteSettingsState {
  loading: boolean;
  name: string;
  description: string;
  logoLocation: string;
}

class SiteSettings extends React.Component<ISiteSettingsProps, ISiteSettingsState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false,
      name: "",
      description: "",
      logoLocation: "",
    };

    this.updateField = this.updateField.bind(this);
    this.fetchSiteSettings = this.fetchSiteSettings.bind(this);
    this.saveSiteSettings = this.saveSiteSettings.bind(this);
  }

  componentDidMount(){
    this.fetchSiteSettings();
  }

  public render() {
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <Card title="Settings" loading={this.state.loading} help="">
            <div className="form-group">
              <label>Site Name</label>
              <input type="text" id="name" className="form-control" value={this.state.name} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Site Subtitle</label>
              <input type="text" id="description" className="form-control" value={this.state.description} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Logo Location</label>
              <input type="text" id="logoLocation" className="form-control" value={this.state.logoLocation} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <button className="btn btn-block btn-primary" onClick={this.saveSiteSettings}>Save Settings</button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  private updateField(e: any){
    const ns = this.state;
    ns[e.target.id] = e.target.value;
    this.setState(ns);
  }

  private fetchSiteSettings(){
    this.setState({ loading: true }, async () => {
      try{
        const res = await SiteAPI.getSiteInfo();
        this.props.appActions.setSiteInfo(res.body.data);
        this.setState({
          loading: false,
          name: res.body.data.name,
          description: res.body.data.description,
          logoLocation: res.body.data.logoLocation,
        });
      }catch(err){
        error("Could not load the site settings.");
        this.setState({ loading: false });
      }
    });
  }

  private saveSiteSettings(){
    const data = {
      name: this.state.name,
      description: this.state.description,
      logoLocation: this.state.logoLocation,
    }
    if(data.name.trim() === "" || data.description.trim() === ""){
      return error("Name and subtitle / description are required");
    }
    this.setState({ loading: true }, async () => {
      try{
        const result = await SiteAPI.updateSiteInfo(data);
        success("Saved!");
        this.props.appActions.setSiteInfo(result.body.data);
        this.setState({ loading: false });
      }catch(err){
        error("Could not save the site settings.");
        this.setState({ loading: false });
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteSettings) as any);