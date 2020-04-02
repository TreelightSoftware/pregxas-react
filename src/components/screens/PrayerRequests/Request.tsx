import * as React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import Card from "../../structure/Card";
import flag from "../../../img/flag_blue.png";

import { ReportRequest } from "./ReportRequest";

export interface IPrayerRequest {
  id: number;
  title: string;
  body: string;
  createdBy: number;
  privacy: "public" | "private";
  created: string;
  status: "pending" | "answered" | "not_answered" | "unknown";
  tags: any;
  prayerCount: number;
  username: string;
}

interface IPrayerRequestProps {
  request: IPrayerRequest;
  loggedInUser: any;
}

interface IPrayerRequestState {
  loading: boolean;
  showReportRequestModal: boolean;
}

export class PrayerRequest extends React.Component<IPrayerRequestProps, IPrayerRequestState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false,
      showReportRequestModal: false,
    };

    this.toggleReportRequest = this.toggleReportRequest.bind(this);

  }
  
  public render() {
    return (
      <Card title="" loading={this.state.loading} help="">
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
            <Link to={`/requests/${this.props.request.id}`}>Read More >></Link>
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
      </Card>
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