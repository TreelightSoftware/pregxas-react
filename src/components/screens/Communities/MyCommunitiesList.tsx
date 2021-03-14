// TODO: given the refactors, this looks very similar to the PublicCommunitiesList.tsx class, so we may want to merge them and
// then take in the specific view via a prop

import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Card from "../../structure/Card";
import CommunityTile from "./CommunityTile";
import GenericContainer from "../../structure/GenericContainer";

import { CommunitiesAPI } from "../../../api";

interface IMyCommunitiesListProps {
  userState: any;
}

interface IMyCommunitiesListState {
  loading: boolean;
  filter: string;

  communities: any; // TODO: type this
  filteredCommunities: any; // we allow client-side filtering of these communities
}

class MyCommunitiesList extends React.Component<IMyCommunitiesListProps, IMyCommunitiesListState> {

  constructor(props: any){
    super(props);
    this.state = {
      loading: false,
      filter: "",

      communities: [],
      filteredCommunities: [],
    };

    this.updateField = this.updateField.bind(this);
    this.fetch = this.fetch.bind(this);
    this.filterCommunities = this.filterCommunities.bind(this);
  }

  componentDidMount(){
    this.fetch();
  }

  public render() {
    return (
      <GenericContainer loading={this.state.loading}>
        <div className="row" style={{marginBottom: 20}}>
          <div className="col-6 offset-3">
            <Card>
              <div className="row">
                <div className="col-12">
                  <input type="text" id="filter" className="form-control" value={this.state.filter} onChange={this.updateField} placeholder="Filter" />
                </div>
              </div>
            </Card>
          </div>
        </div>
        {this.state.communities.length === 0 && (
          <Card title="My Communities" loading={this.state.loading} help="">
            No communities match that filter.
          </Card>
        )}

        <div className="row">
          {this.state.filteredCommunities.map((community: any) => {
            return (
              <div className="col-4" style={{ marginBottom: 20 }} key={community.id}>
                <CommunityTile key={community.id} community={community} />
              </div>
            );
          })}
        </div>
      </GenericContainer>
    );
  }

  private updateField(e: any){
    const id = e.target.id;
    const val = e.target.value;
    const ns = this.state;
    ns[id] = val;
    this.setState(ns, () => {
      // if the id is filter, we need to filter through the communities
      if(id === "filter"){
        this.filterCommunities();
      }
    });
  }

  private fetch() {
    this.setState({ loading: false }, async () => {
      try {
        const result = await CommunitiesAPI.getMyCommunities();
        this.setState({ communities: result.body.data}, () => {
          this.filterCommunities();
        });
      } catch (err) {
        // nothing to do really
        this.setState({ loading: false });
      }
    })
  }

  private filterCommunities(){
    if(this.state.filter.trim() === ""){
      return this.setState({ loading: false, filteredCommunities: this.state.communities});
    }
    const filter = this.state.filter.toLowerCase();
    const filteredCommunities = this.state.communities.filter((community: any) => {
      if(community.name.toLowerCase().indexOf(filter) < 0){
        return false;
      }
      return true;
    });
    this.setState({ loading: false, filteredCommunities});
  }

}


const mapStateToProps = function map(s: any) {
  return {
    userState: s.userState
  };
};

function mapDispatchToProps(dispatch: any) {
  return {

  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCommunitiesList) as any);