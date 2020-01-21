import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { PrayerRequestsAPI } from "../../../api";
import Card from "../../structure/Card";
import { IPrayerRequest, PrayerRequest } from "../PrayerRequests/Request";
import * as AppActions from "../../../reducers/appReducer";

interface IHomePrayerListProps {
  appActions: any;
  userState: any;
  history: any;
}

interface IHomePrayerListState {
  loading: boolean;
  requestsCount: number;
  requestsOffset: number;
  mayHaveMore: boolean;
  requests: IPrayerRequest[];
}

class HomePrayerList extends React.Component<IHomePrayerListProps, IHomePrayerListState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false,
      requestsCount: 10,
      requestsOffset: 0,
      mayHaveMore: true,
      requests: [],
    };

    this.fetchPrayerRequests = this.fetchPrayerRequests.bind(this);
  }

  componentDidMount(){
    this.fetchPrayerRequests();
  }

  public render() {
    return (
      <Card title="" loading={this.state.loading} help="">
        {this.state.requests.map((request: IPrayerRequest) => {
          return (
            <PrayerRequest 
              request={request} 
              key={request.id}
              loggedInUser={this.props.userState.user} />
          );
        })}
      </Card>
    );
  }

  private fetchPrayerRequests(){
    this.setState({loading: true}, async () => {
      try{
        const result = await PrayerRequestsAPI.getGlobalList(this.state.requestsCount, this.state.requestsOffset);
        const newRequests = result.body.data;
        const foundRequests = this.state.requests;
        const requests = foundRequests.concat(newRequests);
        this.setState({
          loading: false,
          requests,
          mayHaveMore: newRequests.length < this.state.requestsCount ? false : true,
        });

      }catch(e){
        return this.setState({loading: false});
      }
    });
  }

}


const mapStateToProps = function map(s: any) {
  return {
    appState: s.appState,
    userState: s.userState,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    appActions: bindActionCreators(AppActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePrayerList) as any);