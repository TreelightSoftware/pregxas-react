import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Card from "./structure/Card";
import * as AppActions from "../reducers/appReducer";

interface IStarterProps {
  appActions: any;
  history: any;
}

interface IStarterState {
  loading: boolean;
}

class Starter extends React.Component<IStarterProps, IStarterState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false
    };

  }

  public render() {
    return (
      <Card title="Starter" loading={this.state.loading} help="">
        Starter Card/ Screen
      </Card>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Starter) as any);