import * as React from "react";
import {Card as BCard} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AppActions from "../../reducers/appReducer";

interface ICardState {
}

interface ICardProps {
  title: string;
  help: string;
  loading: boolean;
  appState: any;
  children?: any;
  canToggle?: boolean;
  defaultOpen?: boolean;
  bsStyle?: string;
  showPermissionMessage?: boolean;
}


class Card extends React.Component<ICardProps, ICardState> {
  constructor(props: any){
    super(props);
    this.state = {};
  }

  get title(){
    if(this.props.title === ""){
      return (<span />);
    }
    return this.props.title;
  }

  get help() {
    if(this.props.appState.showHelp && this.props.help && this.props.help !== ""){
      return (
        <div className="help-container">{this.props.help}</div>
      );
    } else {
      return (<span />);
    }
  }

  public render(){
    return (
        <section>
          <BCard>
            {this.props.title && this.props.title !== "" && (
              <BCard.Header role="title">
                {this.title}
              </BCard.Header>
            )}
              <BCard.Body>
                {this.props.showPermissionMessage && (
                  <div><strong>You do not have permission.</strong></div>
                )}
                {this.help}
                {this.props.loading && 
                  <div style={{textAlign: "center"}}>
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
                {!this.props.loading &&  
                  this.props.children
                }
              </BCard.Body>
          </BCard>
        </section>
    );
  }
}

const mapStateToProps = function map(s: any) {
  return {
    appState: s.appState,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(AppActions, dispatch),
  };
}

export default connect<{}, {}, any>(mapStateToProps, mapDispatchToProps)(Card);