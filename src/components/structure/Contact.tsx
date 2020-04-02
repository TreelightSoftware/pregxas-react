import * as React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";

import { error, success } from "../structure/Alert";
import * as AppActions from "../../reducers/appReducer";
// import { MessagesAPI } from "../../api";


interface IContactProps {
  appActions?: any;
  userActions?: any;

  appState?: any;
  userState?: any;
}

interface IContactState {
  loading: boolean;
  name: string;
  email: string;
  reason: string;
  body: string;
}

class Contact extends React.Component<IContactProps, IContactState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false,
      name: "",
      email: "",
      reason: "support",
      body: ""
    };

    this.submitContact = this.submitContact.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  public updateField(e: any){
    const newState: any = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  public submitContact(){
    if(this.state.name === "" || this.state.email === "" || this.state.body === ""){
      return toastr.error("Error", "You must fill out all fields!");
    }
      // const url: any = window && window.location ? window.location : "Unknown";
      // const browserInformation = window && window.navigator && window.navigator.appVersion ? window.navigator.appVersion : "";
      // const userId = this.props.userState && this.props.userState.user && this.props.userState.user.id ? this.props.userState.user.id : 0;
      this.setState({loading: true}, async () => {
        try{
          // await MessagesAPI.sendContact(this.state.name, this.state.reason, this.state.body, this.state.email, browserInformation, userId, schoolId, url);
          success("Message sent!");
          this.props.appActions.toggleContact();
          this.setState({loading: false});
        }catch(err){
          error("Could not send that message. Please send an email to support@treelightsoftware.com");
          this.setState({loading: false});
        }
      });
  }

  public render() {
    return (
      <div>
        <Modal show={this.props.appState.showContact} onHide={this.props.appActions.toggleContact}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Contact Us</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <strong>We are always adding new features! If you have a request, question, comment, or concern, please reach out to us at any time!</strong>
            </div>
            <div className="form-group">
              <label>How can we assist you?</label>
              <select
                id="reason"
                className="form-control"
                value={this.state.reason}
                onChange={this.updateField} >
                <option value="support">I Need Help</option>
                <option value="question">I Have a Question</option>
                <option value="bug">I Found a Bug or Problem</option>
                <option value="comment">I Have a Comment</option>
              </select>
            </div>
            <div className="form-group">
              <label>Your Name</label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Your Email Address</label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={this.updateField} />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea
                id="body"
                className="form-control"
                value={this.state.body}
                onChange={this.updateField} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-block btn-primary" onClick={this.submitContact}>Submit</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = function map(s: any) {
  return {
    appState: s.appState,
    userState: s.userState,
    schoolState: s.schoolState,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    appActions: bindActionCreators(AppActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);