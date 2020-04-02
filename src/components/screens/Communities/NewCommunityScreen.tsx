import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Card from "../../structure/Card";
import { error } from "../../structure/Alert";
import { CommunitiesAPI } from "../../../api";

interface INewCommunityScreenProps {
  history: any;
}

interface INewCommunityScreenState {
  loading: boolean;
  name: string;
  description: string;
  privacy: string;
  shortCode: string;
  userSignupStatus: string;
}

class NewCommunityScreen extends React.Component<INewCommunityScreenProps, INewCommunityScreenState> {

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      name: "",
      description: "",
      privacy: "private",
      shortCode: "",
      userSignupStatus: "approval_required",
    };

    this.updateField = this.updateField.bind(this);
    this.createCommunity = this.createCommunity.bind(this);

  }

  public render() {
    return (
      <div className="row">
        <div className="col-6 offset-3">
          <Card title="Create a New Community" loading={this.state.loading} help="">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" id="description" value={this.state.description} onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Privacy</label>
              <select className="form-control" id="privacy" value={this.state.privacy} onChange={this.updateField}>
                <option value="private">Private - Do not list</option>
                <option value="public">Public - List and anyone can join</option>
              </select>
            </div>
            {this.state.privacy === "private" && (
              <div>
                <div className="form-group">
                  <label>Join Code</label>
                  <span className="small"> - An optional code required to join a community</span>
                  <input type="text" className="form-control" id="shortCode" value={this.state.shortCode} onChange={this.updateField} />
                </div>
                <div className="form-group">
                  <label>Approval Method</label>
                  <select className="form-control" id="userSignupStatus" value={this.state.userSignupStatus} onChange={this.updateField}>
                    <option value="none">None - Users cannot join even with a code</option>
                    <option value="approval_required">Approval required</option>
                    <option value="auto_accept">Automatically accept requests to join</option>
                  </select>
                </div>
              </div>
            )}
            <div className="form-group">
              <button className="btn btn-block btn-primary" onClick={this.createCommunity}>Create Community</button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  private updateField(e: any) {
    const id = e.target.id;
    const val = e.target.value;
    const ns = this.state;
    ns[id] = val;

    this.setState(ns);
  }

  private createCommunity(){
    const name = this.state.name.trim();
    const description = this.state.description.trim();
    const privacy = this.state.privacy;
    const shortCode = this.state.shortCode;
    const userSignupStatus = this.state.userSignupStatus;

    if(name === "" || description === ""){
      return error("Both name and description are required");
    }

    this.setState({ loading: true}, async () => {
      try{
        const result = await CommunitiesAPI.createCommunity(name, description, privacy, shortCode, userSignupStatus);
        const id = result.body.data.id;
        // redirect to the community page
        this.props.history.push(`/communities/${id}`);
      }catch(err){
        error("We could not create that community");
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
  return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewCommunityScreen) as any);