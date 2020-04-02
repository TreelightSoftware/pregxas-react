import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import { SiteAPI } from "../../../api";
import Logo from "../../structure/Logo";
import * as AppActions from "../../../reducers/appReducer";

import SiteSetup from "./SiteSetup";
import HomePrayerList from "./HomePrayerList";
import { error } from "src/components/structure/Alert";

class Home extends React.Component<any, any> {

  constructor(props: any){
    super(props);
    
    this.state = {};

    this.getSiteInfo = this.getSiteInfo.bind(this);
    this.getContents = this.getContents.bind(this);
  }

  componentDidMount(){
    this.getSiteInfo();
  }

  public render() {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-6 col-offset-3" style={{textAlign: "center"}}>
            <Logo 
              showSubtitle={true}
              />
          </div>
        </div>
        {this.getContents()}

      </div>
    );
  }

  private getSiteInfo(){
    this.setState({loading: true}, async() => {
      try{
        const res = await SiteAPI.getSiteInfo();
        this.props.appActions.setSiteInfo(res.body.data);
        this.setState({loading: false});
      }catch(e){
        this.setState({loading: false});
        return error("We could not connect to a running Pregxas server");
      }
    });
  }

  private getContents(){

    if(this.props.appState.siteInfo === undefined || this.props.appState.siteInfo.status === "pending_setup"){
      return <SiteSetup />;
    }
    // build out dashboard
    return <HomePrayerList />;
  }
}


const mapStateToProps = function map(s: any) {
  return {
    userState: s.userState,
    appState: s.appState,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    appActions: bindActionCreators(AppActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)  as any);