import * as React from "react";
import { connect } from "react-redux";

import defaultLogo from "../../img/banner.png";
const defaultSubtitle = "United in Prayer";

interface ILogoProps {
  appState: any;
  showSubtitle?: boolean;
  subtitleOverride?: string;
}

class Logo extends React.Component<ILogoProps, {}> {

  constructor(props: any){
    super(props);
    this.getSubtitle = this.getSubtitle.bind(this);
  }

  public render() {
    return (
      <div>
        <img src={this.getLogo()} alt="Pregxas Logo" style={{ width: "100%" }} />
        <h3>{this.getSubtitle()}</h3>
      </div>
    );
  }

  private getLogo(){
    if(this.props.appState.siteInfo.logoLocation && this.props.appState.siteInfo.logoLocation !== "" && this.props.appState.siteInfo.logoLocation[0] !== "/"){
      return this.props.appState.siteInfo.logoLocation;
    }
    return defaultLogo;
  }

  private getSubtitle(){
    if(this.props.showSubtitle){
      if(this.props.subtitleOverride && this.props.subtitleOverride !== ""){
        return this.props.subtitleOverride;
      } else if(this.props.appState.siteInfo.description !== ""){
        return this.props.appState.siteInfo.description;
      }
      return defaultSubtitle;
    }
    return null;
  }

}


const mapStateToProps = function map(s: any) {
  return {
    appState: s.appState
  };
};

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Logo);