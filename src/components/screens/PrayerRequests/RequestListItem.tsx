import * as React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import flag from "../../../img/flag_blue.png";
import { IPrayerRequest } from "../../../api/requests";

import { ReportRequest } from "./ReportRequest";

interface IPrayerRequestListItemProps {
  request: IPrayerRequest;
  loggedInUser: any;
}

interface IPrayerRequestListItemState {
  loading: boolean;
  showReportRequestModal: boolean;
}

export class PrayerRequestListItem extends React.Component<IPrayerRequestListItemProps, IPrayerRequestListItemState> {

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
      <div className="row">
        <div className="col-1">
          <img src={flag} alt="Report this request" title="Report this request" style={{height: 48, width: 48}} onClick={this.toggleReportRequest}/>
        </div>
        <div className="col-4">
          <Link to={`/requests/${this.props.request.id}`}>{this.props.request.title}</Link>
        </div>
        <div className="col-4">
          Posted on {moment(this.props.request.created).format("MM/DD/YY h:mm A")} by {this.props.request.username}
        </div>
        <div className="col-2">
          {this.parseStatus(this.props.request.status)}
        </div>
        <ReportRequest 
          request={this.props.request}
          loggedInUser={this.props.loggedInUser}
          show={this.state.showReportRequestModal}
          onClose={this.toggleReportRequest}
          onSubmit={this.toggleReportRequest}
        />
      </div>
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