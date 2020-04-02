import * as React from "react";
import { connect } from "react-redux";

interface IGenericContainerState {
}

interface IGenericContainerProps {
  loading: boolean;
}


class GenericContainer extends React.Component<IGenericContainerProps, IGenericContainerState> {
  public render(){
    return (
        <div>
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
        </div>
    );
  }
}

const mapStateToProps = function map(s: any) {
  return {
    appState: s.appState,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default connect<{}, {}, any>(mapStateToProps, mapDispatchToProps)(GenericContainer);