import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Contact from "./Contact";

import * as AppActions from "../../reducers/appReducer";
import * as UserActions from "../../reducers/userReducer";

import logo from "../../img/icon.png";

interface INavProps {
  appActions: any;
  userActions: any;

  appState: any;
  userState: any;
  history: any;
  location: any;
}

interface INavState {
  open: boolean;
  users: any;
}

class NavBar extends React.Component<INavProps, INavState> {

  constructor(props: any) {
    super(props);
    this.state = {
      open: true,
      users: []
    };

    this.logout = this.logout.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
    this.toggleContact = this.toggleContact.bind(this);
  }

  public logout() {
    this.props.userActions.logoutUser();
    window.localStorage.clear();
    this.props.history.push("/login");
  }

  public toggleMenu(e: any) {
    e.preventDefault();
    this.props.appActions.toggleMenu();
  }

  public toggleHelp(e: any) {
    e.preventDefault();
    this.props.appActions.toggleHelp();
  }

  public toggleContact(e: any) {
    e.preventDefault();
    this.props.appActions.toggleContact();
  }


  get links() {
    // if the site is setup, you get nothing
    if(this.props.appState.siteInfo === undefined || this.props.appState.siteInfo.status === "pending_setup"){
      return [];
    }
    const helpText = this.props.appState.showHelp ? "Hide Tips" : "Show Tips";

    if (this.props.userState.loggedIn) {
      const elements = [];
      elements.push(
        <ul className="navbar-nav mr-auto" key="nav-left">
          <li className="nav-item"><button className="btn btn-link nav-link" onClick={this.toggleMenu} id="menu_toggle" style={{marginTop: "-1px"}}>Menu</button></li>
          <li className="nav-item"><Link to={`/`} className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/about" id="nav-login" className="nav-link">About</Link></li>
          <li className="nav-item"><Link to={`/me`} className="nav-link">Me</Link></li>
        </ul>);
      elements.push(
        <ul className="navbar-nav" key="nav-right">
          <li className="nav-item"><button className="btn btn-link nav-link" onClick={this.toggleHelp}>{helpText}</button></li>
          <li className="nav-item"><button className="btn btn-link nav-link" onClick={this.toggleContact}>Contact</button></li>
          <li className="nav-item"><button className="btn btn-link nav-link" onClick={this.logout}>Logout</button></li>
        </ul>);
      return elements;
    } else {
      const elements = [];
      elements.push(
        <ul className="navbar-nav mr-auto" key="nav-left">
          <li className="nav-item"><Link to="/" id="nav-login" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/about" id="nav-login" className="nav-link">About</Link></li>
          <li className="nav-item"><Link to="/login" id="nav-login" className="nav-link">Login</Link></li>
          <li className="nav-item"><Link to="/signup" id="nav-login" className="nav-link">Sign Up</Link></li>
        </ul>);
      elements.push(
        <ul className="navbar-nav" key="nav-right">
          <li className="nav-item"><button className="btn btn-link nav-link" onClick={this.toggleHelp}>{helpText}</button></li>
          <li className="nav-item"><button className="btn btn-link nav-link" onClick={this.toggleContact}>Contact</button></li>
        </ul>);
      return elements;
    }
  }

  get header() {
    if (this.props.userState.loggedIn) {
      return (
        <button className="btn btn-link navbar-brand" onClick={this.toggleMenu}><img src={logo} alt="logo" height="24px" width="24px" /></button>
      );
    } else {
      return (
        <a className="navbar-brand" href="/"><img src={logo} alt="logo" height="24px" width="24px" /></a>
      );
    }
  }

  public render() {
    return (
      <div id="navbar">
        <nav className="navbar navbar-expand-lg navbar-light" style={{ borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px" }}>
          {this.header}

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {this.links}
          </div>
        </nav>
        <Contact />
      </div>);
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
    appActions: bindActionCreators(AppActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar) as any);