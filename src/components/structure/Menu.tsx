import * as React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Sidebar from "react-sidebar";
import { bindActionCreators } from "redux";

import * as AppActions from "../../reducers/appReducer";

import Logo from "./Logo";

interface IMenuProps {
  appState: any;
  userState: any;
  appActions: any;
}

interface IMenuState {
  open: boolean;
}

class Menu extends React.Component<IMenuProps, IMenuState> {
  constructor(props: any) {
    super(props);
    const defaultState: IMenuState = {
      open: props.open ? props.open : true,
    };
    this.state = defaultState;

    this.toggleOpen = this.toggleOpen.bind(this);
    this.onTransition = this.onTransition.bind(this);
  }
  
  public toggleOpen() {
    this.setState({
      open: !this.state.open
    });
  }

  public onTransition() {
    this.props.appActions.toggleMenu();
  }

  get header() {
    return (
      <div style={styles.sidebar}>
        <div style={styles.header}>
          <Logo showSubtitle={false} />
        </div>
        {this.props.children}
      </div>
    );
  }
  get links() {
    return (
      <div style={styles.sidebar}>
        <div style={styles.header}>
          <Logo showSubtitle={false} />
        </div>
        <div style={styles.content}>
          <div style={styles.divider} />

          <span style={styles.linkHeader}>Account</span>
            <Link to="/me" style={styles.sidebarLink} onClick={this.onTransition} id="menu_dashboard">My Profile</Link>
          <div style={styles.divider} />

          <span style={styles.linkHeader}>Prayer Requests</span>
            <Link to="/requests" style={styles.sidebarLink} onClick={this.onTransition} id="menu_requests">My Requests</Link>
            <Link to="/lists" style={styles.sidebarLink} onClick={this.onTransition} id="menu_lists">My Prayer Lists</Link>
            <Link to="/communities" style={styles.sidebarLink} onClick={this.onTransition} id="menu_communities">My Communities</Link>
          <div style={styles.divider} />

          {this.props.userState && this.props.userState.user && this.props.userState.user.platformRole === "admin" && (
            <div>
              <span style={styles.linkHeader}>Administration</span>
                <Link to="/admin/settings" style={styles.sidebarLink} onClick={this.onTransition} id="menu_admin_settings">Edit Site Settings</Link>
                <Link to="/admin/reports" style={styles.sidebarLink} onClick={this.onTransition} id="menu_admin_reports">Reported Requests</Link>
                <Link to="/admin/stats" style={styles.sidebarLink} onClick={this.onTransition} id="menu_admin_stats">Statistics</Link>
              <div style={styles.divider} />
            </div>
          )}
          

        </div>
      </div>
    );
  }

  public render() {
    return (
      <Sidebar
        sidebar={this.links}
        open={this.props.appState.showMenu}
        onSetOpen={this.onTransition}>
        {this.props.children}
      </Sidebar>
    );
  }
}

const mapStateToProps = function map(s: any) {
  return {
    appState: s.appState,
    userState: s.userState
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    appActions: bindActionCreators(AppActions, dispatch),
  };
}

export default withRouter(connect<{}, {}, any>(mapStateToProps, mapDispatchToProps)(Menu));


const styles: any = {
  sidebar: {
    width: 256,
    height: "100%",
  },
  sidebarLink: {
    display: "block",
    paddingLeft: "8px",
    paddingTop: "2px",
    color: "#757575",
    textDecoration: "none",
  },
  linkHeader: {
    display: "block",
    paddingTop: "12px",
    color: "#757575",
    textDecoration: "none",
    fontWeight: "bold"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "#f2f2f2",
  },
  root: {
    fontFamily: "'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: 300,
  },
  header: {
    backgroundColor: "#f2f2f2",
    color: "white",
    padding: "16px",
    fontSize: "1.5em",
    width: "100%"
  },
};