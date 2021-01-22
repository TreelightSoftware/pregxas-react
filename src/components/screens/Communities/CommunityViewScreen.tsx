import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import Card from "../../structure/Card";
import { error } from "../../structure/Alert";
import { PrayerRequestListItem } from "../PrayerRequests/RequestListItem";
import { PrayerRequestEditor } from "../PrayerRequests/RequestEditor";
import { CommunitiesAPI, PrayerRequestsAPI } from "../../../api";
import { ICommunity, CommunityBlank } from "../../../api/communities";
import { IPrayerRequest, PrayerRequestBlank } from "../../../api/requests";

interface ICommunityViewScreenProps {
  match: any;
  userState: any;
}

interface ICommunityViewScreenState {
  loading: boolean;
  community: ICommunity;
  id: number;
  showStatus: "pending" | "answered" | "not_answered" | "unknown";
  listOffset: number;
  showMoreButton: boolean;
  requests: IPrayerRequest[];

  showNewRequestModal: boolean;
}

class CommunityViewScreen extends React.Component<ICommunityViewScreenProps, ICommunityViewScreenState> {

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      community: CommunityBlank,
      id: 0,
      showStatus: "pending",
      listOffset: 0,
      showMoreButton: true,

      requests: [],
      showNewRequestModal: false,
    };

    this.fetch = this.fetch.bind(this);
    this.fetchRequests = this.fetchRequests.bind(this);
    this.updateField = this.updateField.bind(this);
    this.toggleShowNewRequestModal = this.toggleShowNewRequestModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    }, () => {
      this.fetch();
    });
  }

  public render() {
    return (
      <div id="community_view_screen">
        <div className="row">
          <div className="col-8">
            <Card title="Requests" loading={this.state.loading} help="">
              <div className="row">
                <div className="col-lg-9 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="showStatus">Only Show</label>
                    <select id="showStatus" className="form-control" value={this.state.showStatus} onChange={this.updateField}>
                      <option value="pending">Pending</option>
                      <option value="answered">Answered</option>
                      <option value="not_answered">Not Answered</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-12">
                  <button className="btn btn-primary btn-block" style={{marginTop: 32}} onClick={this.toggleShowNewRequestModal}>New</button>
                </div>
              </div>
                
              {this.state.requests.length === 0 && (
                <div className="row">
                  <div className="col-md-12">
                    <strong>There are no requests!</strong>
                  </div>
                </div>
              )}
              {this.state.requests.map((request: IPrayerRequest) => {
                return (
                  <PrayerRequestListItem
                    key={request.id}
                    request={request}
                    loggedInUser={this.props.userState.user} />
                );
              })}
            </Card>
          </div>
          <div className="col-4">
            <Card title={`${this.state.community.name}`} loading={this.state.loading} help="">
              <p>
                {this.state.community.description}
              </p>
              <p><strong>Members: </strong>{this.state.community.memberCount}</p>
              <p><strong>Requests: </strong>{this.state.community.requestCount}</p>
              <p><strong>Created: </strong>{this.state.community.created.format("MM/DD/YYYY")}</p>
              <p><strong>Community Privacy: </strong>{this.state.community.privacy}</p>
            </Card>
          </div>
        </div>
        <PrayerRequestEditor
          request={PrayerRequestBlank}
          loggedInUser={this.props.userState.user}
          view="modal"
          mode="edit"
          show={this.state.showNewRequestModal}
          onClose={this.toggleShowNewRequestModal}
          onSubmit={() => {}}
        />
      </div>
    );
  }

  private updateField(e: any){
    // this is called if the status changes, so we want to reset the offset and show more button as well
    const ns: ICommunityViewScreenState = this.state;
    ns[e.target.id] = e.target.value;
    ns.showMoreButton = true;
    ns.listOffset = 0;
    this.setState(ns, () => this.fetchRequests());
  }

  private fetch() {
    this.setState({ loading: false }, async () => {
      try {
        const result = await CommunitiesAPI.getCommunity(this.state.id);
        // convert the needed result information, such as moment.js instances
        const community: ICommunity = result.body.data;
        community.created = moment(community.created);
        this.setState({ loading: false, community}, () => this.fetchRequests());
      } catch (err) {
        this.setState({ loading: false }, () => {
          error("Could not load that community. You may not have permission");
        });
      }
    })
  }

  private fetchRequests(){
    this.setState({ loading: true }, async () => {
      try{
        const result = await PrayerRequestsAPI.getListForCommunity(this.state.id, 10, this.state.listOffset);
        const reqs = result.body.data;
        // some branching logic
        // if the result is 0 AND the offset is 0, there are no requests so show that message and hide the more button
        // if the result is 0 AND the offset IS NOT 0, there aren't any more, so leave the requests alone and hide the more button
        // if the result is less than 10, increment the offset, replace the list, hide the more button
        // else, the result is 10, so increment the offset, replace the list
        let requests = this.state.requests;
        let showMoreButton = this.state.showMoreButton;
        let listOffset = this.state.listOffset;

        if(reqs.length === 0 && listOffset === 0){
          // there is none, requests should be 0
          showMoreButton = false;
        } else if(reqs.length === 0 && listOffset > 0){
          showMoreButton = false;
        } else if(reqs.length < 10){
          listOffset += 10;
          requests = reqs;
          showMoreButton = false;
        } else {
          listOffset += 10;
          requests = reqs;
        }
        this.setState({loading: false, requests, listOffset, showMoreButton});
      }catch(err){
        // this is odd, so just return and remove the more button
        this.setState({ loading: false, showMoreButton: false });
      }
    });
  }

  private toggleShowNewRequestModal(){
    this.setState({showNewRequestModal: !this.state.showNewRequestModal});
  }
}


const mapStateToProps = function map(s: any) {
  return {
    userState: s.userState
  };
};

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommunityViewScreen) as any);