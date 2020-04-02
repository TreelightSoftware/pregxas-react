import * as React from "react";
import { Modal } from "react-bootstrap";

import {success, error} from "../../structure/Alert";

import { IPrayerRequest } from "./Request";
import { PrayerRequestsAPI } from "../../../api";

interface IReportRequestProps {
  request: IPrayerRequest;
  loggedInUser: any;
  show: boolean;
  onClose: any;
  onSubmit: any;
}

interface IReportRequestState {
  loading: boolean;
  reason: "offensive" | "threat" | "copyright" | "other";
  reasonText: string;
}

export class ReportRequest extends React.Component<IReportRequestProps, IReportRequestState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false,
      reason: "other",
      reasonText: "",
    };

    this.updateField = this.updateField.bind(this);
    this.submitReport = this.submitReport.bind(this);
    this.getReasonDescription = this.getReasonDescription.bind(this);
  }

  public render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Report {this.props.request.title}</Modal.Title>
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
                <option value="copyright">Copyright Violation</option>
                <option value="offensive">Offensive</option>
                <option value="threat">Threat to Self or Others</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              {this.getReasonDescription()}
            </div>
            <div className="form-group">
              <label>More Information:</label>
              <textarea
                id="reasonText"
                className="form-control"
                value={this.state.reasonText}
                onChange={this.updateField} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-block btn-primary" onClick={this.submitReport}>Submit</button>
          </Modal.Footer>
        </Modal>
    );
  }

  private updateField(e: any){
    const ns = this.state;
    ns[e.target.id] = e.target.value;
    this.setState(ns);
  }

  private getReasonDescription(){
    switch(this.state.reason){
      case "offensive":
        return (
          <div>This prayer request is blatantly or intentionally offensive. <span>Note: Do not report a request simply because it differs theologically.</span></div>
        );
      case "threat":
        return (
          <div>This prayer request threatens the well-being of the poster, another person or animal, or a group.</div>
        );
      case "copyright":
        return (
          <div>This prayer request contains copyrighted material <strong>and I am the copyright holder.</strong></div>
        );
      case "other":
        return (
          <div>This prayer request should be reported for a different reason (please explain below)</div>
        );
    }
  }

  private submitReport(){
    const reason = this.state.reason.trim();
    const reasonText = this.state.reasonText.trim();
    if(reason === "" || reasonText === ""){
      return error("Both the reason and the additional information are required.");
    }
    this.setState({loading: true}, async () => {
      try{
        await PrayerRequestsAPI.reportPrayerRequest(this.props.request.id, reason, reasonText);
        this.setState({loading: false});
        success("Your report has been submitted. A member of the administration team will investigate.");
        this.props.onSubmit();
      }catch(e){
        this.setState({loading: false});
        error("We could not submit that report. Please try again later or contact support.");
        this.props.onSubmit();
      }
    });
  }

}