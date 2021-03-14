import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as UserActions from "src/reducers/userReducer";
import { UserAPI } from "src/api";

interface IScreenProps {
  userActions: any;
  appState: any;
  userState: any;
  children: any;
  fileName?: string;
  information?: string;
  refreshToken?: boolean;

}

interface IScreenState {
  refreshLoading: boolean;
}

class Screen extends React.Component<IScreenProps, IScreenState> {

  constructor(props: any){
    super(props);
    this.state = {
      refreshLoading: false,
    };

  }

  componentDidMount(){
    if(this.props.refreshToken){
      const expiresMoment = moment(this.props.userState.expiresAt);
      const now = moment();
      if(now.add(5, "minutes").isAfter(expiresMoment)){
        this.setState({ refreshLoading: true }, async () => {
          try{
            const result = await UserAPI.refreshToken();
            // save the new expires info; the token itself is an httpOnly cookie so shouldn't be stored
            const user = this.props.userState.user;
            user.expires_in = result.body.data.expires_in;
            user.expires_at = result.body.data.expires_at;
            this.props.userActions.loginUser({loggedIn: true, user});
            this.setState({ refreshLoading: false });
          }catch(err){
            // do we want to redirect or show an error maybe?
            this.setState({ refreshLoading: false });
          }
        })
      }
    }
  }

  public render() {
    if(this.state.refreshLoading){
      return (
        <div style={{textAlign: "center"}}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
      
    return (
      <div>
        {this.props.appState.debug && this.props.userState && this.props.userState.loggedIn && this.props.userState.user.systemRole === 'admin' && 
          <div className="debugWindow">
            {this.props.fileName ? (<div>{`File name: ${this.props.fileName}`}</div>) : null}
            {this.props.information ? (<div>{`Additional Info: ${this.props.information}`}</div>)  : null}
          </div>}
        {this.props.children}
      </div>
    );
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
    userActions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen);