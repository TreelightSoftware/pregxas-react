import * as React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

import flag from "../../../img/flag_blue.png";
import { IPrayerRequest, PrayerRequestBlank } from "../../../api/requests";

import { ReportRequest } from "./ReportRequest";

interface IPrayerRequestProps {
  request: IPrayerRequest;
  loggedInUser: any;
  show?: boolean;
  onClose?: any;
  onSubmit?: any;
  mode: "edit" | "view";
  view: "modal" | "card"
}

interface IPrayerRequestState {
  loading: boolean;
  showReportRequestModal: boolean;
  request: IPrayerRequest;
}

export class PrayerRequestEditor extends React.Component<IPrayerRequestProps, IPrayerRequestState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false,
      showReportRequestModal: false,
      request: PrayerRequestBlank,
    };

    this.toggleReportRequest = this.toggleReportRequest.bind(this);

  }

  componentDidMount(){
    this.setState({
      request: this.props.request,
      loading: false,
    });
  }
  
  public render() {
    return (
    <Modal show={this.props.show} onHide={this.props.onClose} size="xl">
      <Modal.Header closeButton={true}>
        <Modal.Title>Prayer Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-10">
            <h2>{this.props.request.title}</h2>
          </div>
          <div className="col-2">
            <img src={flag} alt="Report this request" title="Report this request" style={{height: 48, width: 48}} onClick={this.toggleReportRequest}/>
          </div>
        </div>
        <p className="request-body">{this.props.request.body.length > 300 ? this.props.request.body.substr(0, 297) + "..." : this.props.request.body}</p>
        <div className="row">
          <div className="col-4">
            Posted on {moment(this.props.request.created).format("MM/DD/YY h:mm A")} by {this.props.request.username}
          </div>
          <div className="col-3">
            Prayed For {this.props.request.prayerCount} times
          </div>
          <div className="col-3">
            This prayer is {this.parseStatus(this.props.request.status)}
          </div>
          <div className="col-2">
            <Link to={`/requests/${this.props.request.id}`}>Read More</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            Tags: {this.props.request.tags.length === 0 && (<strong>None</strong>)}
          </div>
        </div>
        <ReportRequest 
          request={this.props.request}
          loggedInUser={this.props.loggedInUser}
          show={this.state.showReportRequestModal}
          onClose={this.toggleReportRequest}
          onSubmit={this.toggleReportRequest}
        />
      </Modal.Body>
    </Modal>
    );
  }

  private parseStatus(rawStatus: string): string {
    switch(rawStatus){
      case "pending":
        return "Pending";
      case "answered":
        return "Answered";
      case "not_answered":
        return "Not Answered";
      case "unknown":
        return "Closed";
      default:
        return "Closed";
    }
  }

  private toggleReportRequest(){
    this.setState({
      showReportRequestModal: !this.state.showReportRequestModal
    });
  }

}