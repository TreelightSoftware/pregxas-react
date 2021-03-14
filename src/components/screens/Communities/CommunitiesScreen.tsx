import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PublicCommunitiesList from "./PublicCommunitiesList";
import MyCommunitiesList from "./MyCommunitiesList";
import NewCommunityScreen from "./NewCommunityScreen";

interface ICommunitiesScreenProps {
  match: any;
  userState: any;
}

interface ICommunitiesScreenState {
  loading: boolean;
  view: "public" | "mine" | "create";
}

class CommunitiesScreen extends React.Component<ICommunitiesScreenProps, ICommunitiesScreenState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false,
      view: "public" // default to public
    };

    this.toggleMine = this.toggleMine.bind(this);
    this.togglePublic = this.togglePublic.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
  }

  get component(){
    switch(this.state.view){
      case "mine":
        return (<MyCommunitiesList />);
      case "create":
        return (<NewCommunityScreen />);
      case "public":
      default:
        return (<PublicCommunitiesList />);
    }
  }

  public render() {
    return (
      <div>
        {this.props.userState.loggedIn && (
          <div className="row" style={{marginBottom: 20}}>
            <div id="communitiesNavbar" className="col-8 offset-2 justify-content-center">
              <nav className="navbar navbar-expand-lg navbar-light" style={{ borderRadius: "5px"}}>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul id="communitiesNav" className="nav navbar-nav">
                    <li className="nav-item">
                      <button className="btn btn-block btn-link nav-link" style={{ fontWeight: this.state.view === "public" ? "bold" : "normal"}} onClick={this.togglePublic}>Public</button>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-block btn-link nav-link" style={{ fontWeight: this.state.view === "mine" ? "bold" : "normal"}} onClick={this.toggleMine}>Mine</button>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-block btn-link nav-link" style={{ fontWeight: this.state.view === "create" ? "bold" : "normal"}} onClick={this.toggleCreate}>Create</button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        )}
        {this.component}
      </div>
    );
  }

  private togglePublic(){
    this.setState({ view: "public" });
  }

  private toggleMine(){
    this.setState({ view: "mine" });
  }

  private toggleCreate(){
    this.setState({ view: "create" });
  }
}


const mapStateToProps = function map(s: any) {
  return {
    userState: s.userState
  };
};

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommunitiesScreen) as any);