import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Card from "src/components/structure/Card";
import Screen from "src/components/structure/Screen";
import * as AppActions from "src/reducers/appReducer";

import EditProfile from "./EditProfile";

interface IMyProfileProps {
  appActions: any;
  history: any;
}

interface IMyProfileState {
  loading: boolean;
}

class MyProfile extends React.Component<IMyProfileProps, IMyProfileState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false
    };

  }

  public render() {
    return (
      <Screen refreshToken={true} fileName="Profile/ProfileScreen.tsx">
        <div className="row">
          <div className="col-md-4">
            <EditProfile />
          </div>
          <div className="col-md-4">
            <Card title="Communities" loading={this.state.loading} help="">
              My Communities
            </Card>
          </div>
          <div className="col-md-4">
            <Card title="Prayer Lists" loading={this.state.loading} help="">
              My Prayer Lists
            </Card>
          </div>
        </div>
      </Screen>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyProfile) as any);